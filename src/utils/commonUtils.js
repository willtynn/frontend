
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
  return version.major + "." + version.minor + "." + version.patch;
}

export function checkVersionFormat(version) {
  if (!version) {
    return null;
  }
  try {
    const version_arr = version.split(".")
    if (version_arr.length !== 3) {
      return null;
    }
    return {
      major: version_arr[0],
      minor: version_arr[1],
      patch: version_arr[2]
    }
  } catch (error) {
    return null;
  }
}