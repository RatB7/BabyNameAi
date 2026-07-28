/**
 * Safely copies text to the user's clipboard.
 * Uses navigator.clipboard when available and authorized, and falls back to document.execCommand('copy')
 * if inside a sandboxed iframe without clipboard permissions.
 */
export async function copyToClipboard(text: string): Promise<boolean> {
  if (navigator.clipboard && window.isSecureContext) {
    try {
      await navigator.clipboard.writeText(text);
      return true;
    } catch (err) {
      console.warn("navigator.clipboard.writeText failed, using document.execCommand fallback", err);
    }
  }

  try {
    const textArea = document.createElement("textarea");
    textArea.value = text;
    
    // Set fixed non-interfering styles
    textArea.style.position = "fixed";
    textArea.style.top = "0";
    textArea.style.left = "0";
    textArea.style.opacity = "0";
    textArea.style.pointerEvents = "none";
    
    document.body.appendChild(textArea);
    textArea.focus();
    textArea.select();
    
    const successful = document.execCommand("copy");
    document.body.removeChild(textArea);
    return successful;
  } catch (err) {
    console.error("Failed to copy text to clipboard:", err);
    return false;
  }
}
