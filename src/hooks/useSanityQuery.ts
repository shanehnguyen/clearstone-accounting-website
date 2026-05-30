import {useQuery, type UseQueryOptions} from '@tanstack/react-query'
import {sanityClient} from '@/lib/sanity'

export function useSanityQuery<T = unknown>(
  queryKey: string[],
  groqQuery: string,
  params?: Record<string, unknown>,
  options?: Omit<UseQueryOptions<T>, 'queryKey' | 'queryFn'>,
) {
  return useQuery<T>({
    queryKey,
    queryFn: () => sanityClient.fetch<T>(groqQuery, params),
    staleTime: 5 * 60 * 1000,
    gcTime: 30 * 60 * 1000,
    ...options,
  })
}
