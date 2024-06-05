import { useThemeContext } from '@/context/ThemeContext'
import { LinkingDetails } from '@/model/linking'
import { Flex, Text } from '@kuma-ui/core'
import Image from 'next/image'
import Link from 'next/link'
import right from '../../public/images/ic_pointer_right@2x.png'
import rightLight from '../../public/images/ic_pointer_rightLight@2x.png'

export function LinkingBox(props: { data: LinkingDetails[] }) {
  const { isDark } = useThemeContext()
  return (
    <Flex p="10px">
      {props.data.map(({ name, urlLink }, index) => (
        <Flex key={name}>
          <Link href={urlLink}>
            <Text
              fontSize="12px"
              color={`${index === props.data.length - 1 ? 'var(--on-surface-on-surface-lv-2)' : 'var(--color-primary-default)'}`}
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
