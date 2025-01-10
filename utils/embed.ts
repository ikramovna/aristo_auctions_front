export function convertToEmbed(url: string) {
  // Match the video ID from the URL using a regular expression
  const regex =
    /^(?:(?:https?:)?\/\/)?(?:www\.)?(?:youtu\.be\/|(?:youtube(?:-nocookie)?\.com\/(?:.*(?:\/|v=))|(?:youtube.googleapis.com\/v\/)))([^&?\s]{11})/i
  let match
  if (url?.length) {
    match = url.match(regex)
  }
  if (match?.length) {
    return match[1]
  }
}
