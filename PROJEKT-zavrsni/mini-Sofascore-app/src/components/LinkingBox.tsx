import { useThemeContext } from '@/context/ThemeContext'
import { LinkingDetails } from '@/model/linking'
import { Flex, Text } from '@kuma-ui/core'
import Image from 'next/image'
import Link from 'next/link'
import right from '../../public/images/ic_pointer_right@2x.png'
import rightLight from '../../public/images/ic_pointer_rightLight@2x.png'
import { useWindowSizeContext } from '@/context/WindowSizeContext'

export function LinkingBox(props: { data: LinkingDetails[] }) {
  const { isDark } = useThemeContext()
  const { mobileWindowSize } = useWindowSizeContext()
  return (
    <Flex
      w={`${mobileWindowSize ? '100%' : '30%'}`}
      h="100%"
      backgroundColor={`${mobileWindowSize ? 'var(--surface-surface-1)' : 'inherit'}`}
      alignItems="center"
    >
      {props.data.map(({ name, urlLink }, index) => (
        <Flex key={name}>
          <Link
            href={urlLink}
            onClick={(e: { preventDefault: () => void }) => {
              if (index === props.data.length - 1) {
                e.preventDefault()
              }
            }}
          >
            <Text
              fontSize="12px"
              color={`${
                index === props.data.length - 1 ? 'var(--on-surface-on-surface-lv-2)' : 'var(--color-primary-default)'
              }`}
              _hover={{ textDecoration: `${index !== props.data.length - 1 ? 'underline' : 'none'}` }}
            >
              {name}
            </Text>
          </Link>
          {index === props.data.length - 1 ? null : (
            <Image src={isDark ? rightLight : right} alt="icon right" width={15} height={15}></Image>
          )}
        </Flex>
      ))}
    </Flex>
  )
}
