type DebounceFunction<T extends (...args: any[]) => void> = (
  ...args: Parameters<T>
) => void

export function debounce<T extends (...args: any[]) => void>(
  callback: T,
  delay: number,
): DebounceFunction<T> {
  let timer: NodeJS.Timeout | null = null

  return (...args: Parameters<T>): void => {
    if (timer) {
      clearTimeout(timer)
    }

    timer = setTimeout(() => {
      callback(...args)
    }, delay)
  }
}
