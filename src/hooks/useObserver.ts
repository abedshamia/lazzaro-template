import { useEffect, useMemo, useState } from 'react'

function useObserver(ref: any) {
  const [isIntersecting, setIsIntersecting] = useState(false)

  const observer = useMemo(
    () => new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) setIsIntersecting(entry.isIntersecting)
    }),
    [],
  )

  useEffect(() => {
    observer.observe(ref.current)

    return () => {
      observer.disconnect()
    }
  }, [ref, observer])

  return isIntersecting
}

export default useObserver
