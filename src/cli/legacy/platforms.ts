export type Platforms = 'common' | 'deskpad' | 'desktop' | 'touch' | 'touch-pad' | 'touch-phone'

/**
 * Platform layers with levels.
 */
export const platforms = new Map<Platforms, Platforms[]>()

platforms.set('common', ['common'])
platforms.set('deskpad', ['common', 'deskpad'])
platforms.set('desktop', ['common', 'deskpad', 'desktop'])
platforms.set('touch', ['common', 'touch'])
platforms.set('touch-pad', ['common', 'deskpad', 'touch', 'touch-pad'])
platforms.set('touch-phone', ['common', 'touch', 'touch-phone'])
