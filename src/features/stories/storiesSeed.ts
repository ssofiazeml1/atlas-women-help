// Hardcoded seed stories exported so the admin can read & override them.
export interface SeedStoryRaw {
  id: number
  published: boolean
  title: Record<string, string>
  situation: Record<string, string>
  actions: Record<string, string>
  outcome: Record<string, string>
  tags?: string[]
}

// Public stories must come from the moderated shared store. The former sample
// narratives were removed because they had no provenance or consent record.
export const PUBLISHED_STORIES: SeedStoryRaw[] = []
