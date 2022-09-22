import { type FC } from 'react'
import { useTranslation } from 'react-i18next'
import { useNavigate } from 'react-router-dom'
import { useTheme } from 'styled-components'
import { Button, Flex, Text } from '../common'
import Share from '../ShareModal/Share'

interface IProps {
  transactionId: string;
  redirectPath: '#events' | '#courses' | '#causes' | 'shop' | 'donate' | 'partners';
  sectionId: string;
  isError: boolean;
}

const TransactionId:FC<IProps> = (props) => {
  const {
    transactionId, redirectPath, sectionId, isError
  } = props
  const { t } = useTranslation()
  const navigate = useNavigate()
  const navigateTo = (path: string) => () => navigate(path)
  const { secondary, primary } = useTheme()
  const sectionTitle = redirectPath.startsWith('#')
    ? redirectPath.slice(redirectPath.indexOf('#') + 1)
    : redirectPath

  return (
    <Flex mt={1} direction="column" gap={3} textAlign="left">
      <Flex width="fit-content" p={3} border="0.5px" radius="5" direction="column">
        <Text lineHeight={1} textAlign="left" fontSize={1.1} weight="bold" color={secondary}>
          {t('finalize.id')}:
        </Text>

        <Text weight="bold" fontSize={1} color={primary} textAlign="left">
          {transactionId}
        </Text>

        <Text textAlign="left" color="red">{isError && t('fail.error')}</Text>
      </Flex>

      <Flex width="fit-content" py={1.5} px={3} justify="center" border="0.5px" radius="5" direction="column">
        <Text weight="bold" fontSize={1.1} color={secondary} textAlign="left">
          {t('finalize.share')}
        </Text>
        <Share section={sectionTitle} sectionId={sectionId} />
      </Flex>

      <Button onClick={navigateTo('/')}>{t('finalize.return')}</Button>
    </Flex>
  )
}

export default TransactionId
