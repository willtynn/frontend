
export function handleLinkWithoutProtocol(link) {
  if (typeof link != 'string') {
    return link;
  }
  if (link.startsWith('https://') || link.startsWith('http://')) {
    return link;
  }
  return 'https://' + link;
}

export function transformVersion(version) {
  if (!version) {
    return "";
  }
  return version.major + "." +  version.minor + "." + version.patch;
}