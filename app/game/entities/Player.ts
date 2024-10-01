// Player.ts
import { playRandomSfx, jumpSfx, landSfx, dyingSfx } from "@/app/game/utils/Audio";
import { FloorPlatform } from "./FloorPlatforms";

export class Player {
  x: number;
  y: number;  
  previousY: number;
  width: number;
  height: number;
  velocityX: number;
  velocityY: number;
  isJumping: boolean;
  gravity: number;
  jumpStrength: number;
  rotation: number;
  rotationSpeed: number;
  color: string;
  isInvincible: boolean;
  isDead: boolean;
  isGrounded: boolean;
  hasLanded: boolean;

  private readonly normalColor = '#acddfb';
  private readonly powerUpColor = '#ffd700';
  private readonly moveSpeed = 5;
  
  constructor(startingPlatform: FloorPlatform) {
    this.x = 100;
    this.y = startingPlatform.y - 100;   
    this.previousY = this.y; 
    this.width = 25;
    this.height = 25;
    this.velocityX = 0;
    this.velocityY = 0;
    this.isJumping = false;
    this.gravity = 0.5;
    this.jumpStrength = -10;
    this.rotation = 0;
    this.rotationSpeed = 0.1;
    this.color = this.normalColor;
    this.isInvincible = false;
    this.isDead = false;
    this.isGrounded = false;
    this.hasLanded = false;
  }

  handleKeyDown(event: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(event.code)) event.preventDefault();
    if (event.code === 'ArrowLeft') this.moveLeft();
    if (event.code === 'ArrowRight') this.moveRight();
    if (event.code === 'Space') this.jump();
  }
  
  handleKeyUp(event: KeyboardEvent) {
    if (event.code === 'ArrowLeft' || event.code === 'ArrowRight') this.stopMoving();
  }

  moveLeft() {this.velocityX = -this.moveSpeed;}
  moveRight() {this.velocityX = this.moveSpeed;}
  stopMoving() {this.velocityX = 0;}
  
  updatePosition(canvasWidth: number) {
    this.x += this.velocityX;
    if (this.x < 0) this.x = 0;
    if (this.x + this.width > canvasWidth) this.x = canvasWidth - this.width;
  }

  jump() {
    this.velocityY = this.jumpStrength;
    this.isJumping = true;
    this.isGrounded = false;
    this.hasLanded = false;
    playRandomSfx(jumpSfx, 'jump');
  }

  applyGravity() {
    if (!this.isGrounded) {
      this.velocityY += this.gravity;
      this.y += this.velocityY;
      this.rotation += this.rotationSpeed;
    } else {
      this.rotation = 0; // Reset rotation when grounded
    }
  }

  checkPlatformCollision(floorPlatforms: FloorPlatform[], platformSpeed: number) {
    for (const platform of floorPlatforms) {
      // Check if player has collided with the left or right side of the platform
      const isCollidingWithSide =
        this.y + this.height > platform.y && // Player is within the vertical bounds of the platform
        this.y < platform.y + platform.height && // Player is not completely above the platform
        ((this.x + this.width >= platform.x && this.x < platform.x) || // Collides with the left side of the platform
         (this.x <= platform.x + platform.width && this.x + this.width > platform.x + platform.width)); // Collides with the right side of the platform
  
      if (isCollidingWithSide) {
        // Handle side collision
        this.velocityX = -platformSpeed; // Move backward at the same speed as the platform
        
        if (!this.isGrounded) {
          // If the player is not on a platform, allow them to fall
          this.velocityY += this.gravity; // Apply gravity to make the player fall (slide down)
          this.x = platform.x - this.width; // Stick to the side of the platform
        } else {
          // If the player is grounded, stop the downward movement
          this.velocityY = 0;
        }
  
        return; // Exit the function to prevent further checks
      }
  
      // Check if player has landed on top of a platform
      const isPlayerOnPlatform =
        this.x < platform.x + platform.width && // Player's left side is to the left of platform's right side
        this.x + this.width > platform.x && // Player's right side is to the right of platform's left side
        this.previousY + this.height <= platform.y && // Ensure the player's bottom was above the platform's top in the previous frame
        this.y + this.height >= platform.y && // Check if the player's bottom is exactly at the platform's top
        this.velocityY >= 0; // Ensure the player is falling
  
      if (isPlayerOnPlatform) {
        // Handle landing on the platform
        this.isGrounded = true;
        this.isJumping = false;
        this.velocityY = 0;
        this.y = platform.y - this.height; // Position player on top of the platform
        this.rotation = 0;
  
        if (!this.hasLanded) {
          playRandomSfx(landSfx, 'land');
          this.hasLanded = true;
        }
  
        return; // Exit the function since the player has landed on a platform
      }
    }
  
    // If no platform collision detected, the player is airborne
    this.isGrounded = false;
    this.hasLanded = false;
  }    

  handleFall(canvasHeight: number, setGamePaused: (paused: boolean) => void, audio: HTMLAudioElement | null) {
    if (this.y >= canvasHeight - this.height) {
      setGamePaused(true);
      playRandomSfx(dyingSfx, 'dying');
      if (audio) audio.pause();
      this.isDead = true;
    }
  }

  applyPowerUp(isPowerUpActive: boolean) {
    this.color = isPowerUpActive ? this.powerUpColor : this.normalColor;
    this.isInvincible = isPowerUpActive;
  }
}

// Factory / Utility function to create a player instance
export const createPlayer = (startingPlatform: FloorPlatform): Player => new Player(startingPlatform);

// Utility function to calculate jump distance
export const calculateJumpDistance = (jumpStrength: number, gravity: number, horizontalSpeed: number) => {
  const timeToPeak = jumpStrength / gravity;
  const totalTimeInAir = timeToPeak * 2;
  return horizontalSpeed * totalTimeInAir;
};

// Main update function, simplified
export const updatePlayer = (
  player: Player, 
  canvasWidth: number, 
  canvasHeight: number,
  isPowerUpActive: boolean,
  gamePaused: boolean,
  setGamePaused: (paused: boolean) => void,
  audio: HTMLAudioElement | null,
  floorPlatforms: FloorPlatform[],
  platformSpeed: number
) => {
  if (gamePaused || player.isDead) return;  

  player.applyPowerUp(isPowerUpActive);
  player.updatePosition(canvasWidth);
  player.applyGravity();
  player.checkPlatformCollision(floorPlatforms, platformSpeed);
  
  if (!player.isGrounded) player.handleFall(canvasHeight, setGamePaused, audio);
};
