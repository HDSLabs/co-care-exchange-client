export interface Prompt {
  // Uniquely identifies this instance
  id: string;

  // What type of prompt this is.
  promptType: string;

  // The name of the prompt group.
  groupName: string;

  // The item being shared or requested
  item: string;

  // Comma-separated list of possible units of issue for the item.
  unitsOfIssue: string;

  // The user-friendly version of the prompt
  display: string;

  // who can see this prompt
  audience: string;

  unitsOfIssueChoices: string[];
  requesting: number;
  sharing: number;
  sizeChoices: string[];
  size: string;
  sizes: string;
  unit: string;
  requesterNotes: string;
  sharerNotes: string;
}
