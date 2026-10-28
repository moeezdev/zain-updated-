/**
 * Audio playback & sound effect utility.
 * Default song: /assets/aistudio/zqin0audio_9528da28.mp3 (Kaash Woh Pal)
 * Amplified 30% louder via Web Audio GainNode.
 */

const DEFAULT_SONG_URL = '/assets/aistudio/zqin0audio_9528da28.mp3';
const DEFAULT_SONG_NAME = 'Kaash Woh Pal 🎶';

class SoundController {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private isBgmPlaying: boolean = false;
  private customAudio: HTMLAudioElement | null = null;
  private audioSourceNode: MediaElementAudioSourceNode | null = null;
  private bgmGainNode: GainNode | null = null;
  private customSongUrl: string = DEFAULT_SONG_URL;
  private customSongName: string = DEFAULT_SONG_NAME;
  // 1.0 base volume, boosted 30% louder (gain = 1.30)
  private volumeMultiplier: number = 1.30;
  private userVolume: number = 1.0;

  constructor() {
    this.customSongUrl = DEFAULT_SONG_URL;
    this.customSongName = DEFAULT_SONG_NAME;
    this.setupCustomAudio(DEFAULT_SONG_URL);
  }

  private setupCustomAudio(url: string) {
    if (this.customAudio) {
      this.customAudio.pause();
      this.customAudio = null;
      this.audioSourceNode = null;
      this.bgmGainNode = null;
    }

    const audio = new Audio(url);
    audio.loop = true;
    audio.volume = 1.0; // Max element output
    audio.preload = 'auto';
    this.customAudio = audio;
  }

  private initContext() {
    if (!this.ctx) {
      const AudioCtx =
        window.AudioContext ||
        (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume().catch(() => {});
    }

    if (this.ctx && this.customAudio && !this.audioSourceNode) {
      try {
        this.audioSourceNode = this.ctx.createMediaElementSource(this.customAudio);
        this.bgmGainNode = this.ctx.createGain();
        // 30% louder amplification
        this.bgmGainNode.gain.setValueAtTime(
          this.userVolume * this.volumeMultiplier,
          this.ctx.currentTime
        );
        this.audioSourceNode.connect(this.bgmGainNode);
        this.bgmGainNode.connect(this.ctx.destination);
      } catch (err) {
        // Fallback to standard element output
        console.warn('Web Audio gain amplification fallback', err);
      }
    }
  }

  public setVolume(vol: number) {
    this.userVolume = Math.max(0, Math.min(1, vol));
    if (this.bgmGainNode && this.ctx) {
      this.bgmGainNode.gain.setValueAtTime(
        this.userVolume * this.volumeMultiplier,
        this.ctx.currentTime
      );
    }
    if (this.customAudio) {
      this.customAudio.volume = Math.max(0, Math.min(1, this.userVolume));
    }
  }

  public getVolume(): number {
    return this.userVolume;
  }

  public toggleBgm(): boolean {
    if (this.isBgmPlaying) {
      this.stopBgm();
      return false;
    } else {
      this.startBgm();
      return true;
    }
  }

  public startBgm() {
    this.isBgmPlaying = true;
    this.initContext();

    if (!this.customAudio) {
      this.setupCustomAudio(this.customSongUrl);
      this.initContext();
    }

    if (this.customAudio) {
      this.customAudio.volume = 1.0;
      const playPromise = this.customAudio.play();
      if (playPromise !== undefined) {
        playPromise.catch(() => {
          // Will be unlocked on first user tap/click
        });
      }
    }
  }

  public stopBgm() {
    this.isBgmPlaying = false;
    if (this.customAudio) {
      this.customAudio.pause();
    }
  }

  public getIsBgmPlaying(): boolean {
    return this.isBgmPlaying;
  }

  public getCustomSongName(): string {
    return this.customSongName;
  }

  public playChime() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, i) => {
        const osc = this.ctx!.createOscillator();
        const gain = this.ctx!.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(freq, now + i * 0.08);

        gain.gain.setValueAtTime(0, now + i * 0.08);
        gain.gain.linearRampToValueAtTime(0.12, now + i * 0.08 + 0.03);
        gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.08 + 0.9);

        osc.connect(gain);
        gain.connect(this.ctx!.destination);
        osc.start(now + i * 0.08);
        osc.stop(now + i * 0.08 + 1.0);
      });
    } catch {}
  }

  public playPop() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(400, now);
      osc.frequency.exponentialRampToValueAtTime(900, now + 0.12);

      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.15);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.16);
    } catch {}
  }

  public playWrong() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(220, now);
      osc.frequency.linearRampToValueAtTime(170, now + 0.25);

      gain.gain.setValueAtTime(0.1, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.3);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.31);
    } catch {}
  }

  public playDodge() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(300 + Math.random() * 200, now);
      osc.frequency.linearRampToValueAtTime(600 + Math.random() * 300, now + 0.15);

      gain.gain.setValueAtTime(0.08, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.2);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.22);
    } catch {}
  }

  public playSparkle() {
    if (this.isMuted) return;
    try {
      this.initContext();
      if (!this.ctx) return;
      const now = this.ctx.currentTime;
      const osc = this.ctx.createOscillator();
      const gain = this.ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(1200 + Math.random() * 400, now);

      gain.gain.setValueAtTime(0.05, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.18);

      osc.connect(gain);
      gain.connect(this.ctx.destination);
      osc.start(now);
      osc.stop(now + 0.2);
    } catch {}
  }
}

export const sound = new SoundController();
