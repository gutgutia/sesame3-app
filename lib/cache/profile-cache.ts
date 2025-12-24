/**
 * Simple in-memory cache for profile data
 * Used to speed up repeated profile lookups within a session
 */

type CachedProfile = {
  firstName: string | null;
  preferredName: string | null;
  grade: string | null;
  activities: Array<{ title: string; isLeadership: boolean }>;
  cachedAt: number;
};

// Cache with TTL of 5 minutes
const CACHE_TTL_MS = 5 * 60 * 1000;

// In-memory store (will reset on server restart - that's fine for dev)
const profileCache = new Map<string, CachedProfile>();

/**
 * Get cached profile data
 */
export function getCachedProfile(profileId: string): CachedProfile | null {
  const cached = profileCache.get(profileId);
  
  if (!cached) return null;
  
  // Check if expired
  if (Date.now() - cached.cachedAt > CACHE_TTL_MS) {
    profileCache.delete(profileId);
    return null;
  }
  
  return cached;
}

/**
 * Cache profile data
 */
export function setCachedProfile(
  profileId: string,
  data: Omit<CachedProfile, "cachedAt">
): void {
  profileCache.set(profileId, {
    ...data,
    cachedAt: Date.now(),
  });
}

/**
 * Invalidate cache for a profile (call after profile updates)
 */
export function invalidateProfileCache(profileId: string): void {
  profileCache.delete(profileId);
}

/**
 * Clear all cache (for testing)
 */
export function clearProfileCache(): void {
  profileCache.clear();
}
