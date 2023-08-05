export default function checkMobile(setIsMobile) {
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    setIsMobile(true);
  } else {
    setIsMobile(false);
  }
}
