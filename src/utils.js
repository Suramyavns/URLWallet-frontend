export async function copyToClipboard(text) {
  try {
    if (navigator.clipboard) {
      await navigator.clipboard.writeText(text);
    } else {
      // Fallback for older browsers
      const textarea = document.createElement('textarea');
      textarea.value = text;
      document.body.appendChild(textarea);
      textarea.select();
      document.execCommand('copy'); // Still using execCommand for fallback
      document.body.removeChild(textarea);
      return true
    }
  } catch (err) {
    alert('Failed to copy! Please try again later');
    console.error('Failed to copy: ', err);
  }
}

