/**
 * CyberSound Engine
 * Procedurally synthesized sounds using Web Audio API — no external files needed.
 * All sounds are generated in real-time using oscillators, filters, and gain nodes.
 */

type SoundId =
  | "boot_beep"
  | "boot_sequence"
  | "transition_whoosh"
  | "menu_hover"
  | "menu_confirm"
  | "level_enter"
  | "level_exit"
  | "konami_fanfare"
  | "ambient_start";

class CyberSoundEngine {
  private ctx: AudioContext | null = null;
  private enabled: boolean = true;
  private ambientGain: GainNode | null = null;
  private ambientOsc: OscillatorNode | null = null;
  private initialized = false;

  private getCtx(): AudioContext {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    return this.ctx;
  }

  init() {
    if (this.initialized) return;
    this.initialized = true;
  }

  // Resume context on first user interaction
  async resume() {
    const ctx = this.getCtx();
    if (ctx.state === "suspended") {
      await ctx.resume();
    }
  }

  setEnabled(enabled: boolean) {
    this.enabled = enabled;
    if (this.ambientGain) {
      this.ambientGain.gain.setTargetAtTime(enabled ? 0.06 : 0, this.getCtx().currentTime, 0.3);
    }
  }

  isEnabled() {
    return this.enabled;
  }

  play(id: SoundId) {
    if (!this.enabled) return;
    try {
      switch (id) {
        case "boot_beep":       return this._bootBeep();
        case "boot_sequence":   return this._bootSequence();
        case "transition_whoosh": return this._transitionWhoosh();
        case "menu_hover":      return this._menuHover();
        case "menu_confirm":    return this._menuConfirm();
        case "level_enter":     return this._levelEnter();
        case "level_exit":      return this._levelExit();
        case "konami_fanfare":  return this._konamiFanfare();
        case "ambient_start":   return this._startAmbient();
      }
    } catch (e) {
      // Silently fail — audio context may not be available
    }
  }

  // ─── Sounds ───────────────────────────────────────────────────────────────

  private _bootBeep() {
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.frequency.setValueAtTime(880, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.08);
    gain.gain.setValueAtTime(0.12, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.12);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.13);
  }

  private _bootSequence() {
    const ctx = this.getCtx();
    const freqs = [220, 330, 440, 660, 880, 1100];
    freqs.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      const filter = ctx.createBiquadFilter();
      filter.type = "bandpass";
      filter.frequency.value = freq;
      filter.Q.value = 2;
      osc.connect(filter);
      filter.connect(gain);
      gain.connect(ctx.destination);
      const t = ctx.currentTime + i * 0.18;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0, t);
      gain.gain.linearRampToValueAtTime(0.08, t + 0.02);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.14);
      osc.start(t);
      osc.stop(t + 0.15);
    });
  }

  private _transitionWhoosh() {
    const ctx = this.getCtx();
    // Smooth sweeping whoosh — no harsh noise
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.setValueAtTime(2000, ctx.currentTime);
    filter.frequency.exponentialRampToValueAtTime(200, ctx.currentTime + 0.5);
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc2.type = "sine";
    osc.frequency.setValueAtTime(300, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(60, ctx.currentTime + 0.5);
    osc2.frequency.setValueAtTime(305, ctx.currentTime); // slight detune for richness
    osc2.frequency.exponentialRampToValueAtTime(62, ctx.currentTime + 0.5);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.18, ctx.currentTime + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.5);
    osc.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.55);
    osc2.stop(ctx.currentTime + 0.55);
  }

  private _menuHover() {
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(660, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(880, ctx.currentTime + 0.05);
    gain.gain.setValueAtTime(0.06, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.06);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.07);
  }

  private _menuConfirm() {
    const ctx = this.getCtx();
    const notes = [440, 550, 660, 880];
    notes.forEach((freq, i) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "sine";
      const t = ctx.currentTime + i * 0.06;
      osc.frequency.setValueAtTime(freq, t);
      gain.gain.setValueAtTime(0.1, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + 0.08);
      osc.start(t);
      osc.stop(t + 0.09);
    });
  }

  private _levelEnter() {
    const ctx = this.getCtx();
    // Smooth ascending cinematic tone
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const reverb = ctx.createConvolver();
    // Simple delay for depth
    const delay = ctx.createDelay(0.5);
    delay.delayTime.value = 0.3;
    const delayGain = ctx.createGain();
    delayGain.gain.value = 0.25;
    osc.type = "sine";
    osc2.type = "triangle";
    osc.frequency.setValueAtTime(110, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(440, ctx.currentTime + 0.4);
    osc2.frequency.setValueAtTime(110, ctx.currentTime);
    osc2.frequency.exponentialRampToValueAtTime(220, ctx.currentTime + 0.4);
    osc.connect(gain);
    osc2.connect(gain);
    gain.connect(ctx.destination);
    gain.connect(delay);
    delay.connect(delayGain);
    delayGain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.2, ctx.currentTime + 0.08);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.55);
    osc.start(ctx.currentTime);
    osc2.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.6);
    osc2.stop(ctx.currentTime + 0.6);
  }

  private _levelExit() {
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const gain = ctx.createGain();
    osc.connect(gain);
    gain.connect(ctx.destination);
    osc.type = "sine";
    osc.frequency.setValueAtTime(440, ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(110, ctx.currentTime + 0.35);
    gain.gain.setValueAtTime(0.15, ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.38);
    osc.start(ctx.currentTime);
    osc.stop(ctx.currentTime + 0.4);
  }

  private _konamiFanfare() {
    const ctx = this.getCtx();
    const melody = [
      { freq: 392, dur: 0.12 },
      { freq: 523, dur: 0.12 },
      { freq: 659, dur: 0.12 },
      { freq: 784, dur: 0.18 },
      { freq: 1047, dur: 0.3 },
    ];
    let t = ctx.currentTime;
    melody.forEach(({ freq, dur }) => {
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.type = "square";
      osc.frequency.value = freq;
      gain.gain.setValueAtTime(0.08, t);
      gain.gain.exponentialRampToValueAtTime(0.001, t + dur);
      osc.start(t);
      osc.stop(t + dur + 0.01);
      t += dur * 0.9;
    });
  }

  private _startAmbient() {
    if (this.ambientOsc) return; // already running
    const ctx = this.getCtx();
    const osc = ctx.createOscillator();
    const osc2 = ctx.createOscillator();
    const gain = ctx.createGain();
    const filter = ctx.createBiquadFilter();
    filter.type = "lowpass";
    filter.frequency.value = 300;
    filter.Q.value = 0.5;
    osc.type = "sine";
    osc2.type = "sine";
    osc.frequency.value = 55;
    osc2.frequency.value = 55.5; // slight detune for warmth
    osc.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(ctx.destination);
    gain.gain.setValueAtTime(0, ctx.currentTime);
    gain.gain.linearRampToValueAtTime(this.enabled ? 0.06 : 0, ctx.currentTime + 2);
    osc.start();
    osc2.start();
    this.ambientOsc = osc;
    this.ambientGain = gain;
  }

  stopAmbient() {
    if (this.ambientGain && this.ambientOsc) {
      const ctx = this.getCtx();
      this.ambientGain.gain.setTargetAtTime(0, ctx.currentTime, 0.5);
      setTimeout(() => {
        try { this.ambientOsc?.stop(); } catch {}
        this.ambientOsc = null;
        this.ambientGain = null;
      }, 2000);
    }
  }
}

// Singleton export
export const Sound = new CyberSoundEngine();
