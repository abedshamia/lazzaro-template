import { Routes, Route } from 'react-router-dom'
import { BecomeMemberForm } from '../../components/Forms/BecomeMemberForm'
import { ContactusForm } from '../../components/Forms/ContactusForm'
import { useAppSelector } from '../../hooks'
import { IROUTE } from '../../types/interfaces'
import {
  Aboutus,
  BecomeVolunteerForm,
  Landing,
  ProjectDetails,
  Shop,
  Donate,
  SingleEvent,
  SingleProduct,
  TermsAndConditions,
  ErrorPage,
  FinalizeDonationPage,
  FinalizeProjectDonationPage,
  FinalizeEventPaymentPage,
  FinalizeCoursePaymentPage,
  FinalizeProductPaymentPage,
} from '../../views'
import FinalizeSubscriptionDonation from '../../views/FinalizeSubscriptionDonation'

const BASE_PATH = ':firstName/:lastName/:home_address/:user_email'
export default function AllRoute() {
  const {
    causes, events, market, courses, volunteers, partners, donations
  } = useAppSelector(({ ong }) => ong.ongConfig?.features) || {}

  const ROUTES: IROUTE[] = [
    {
      path: '/',
      render: true,
      Element: Landing,
    },
    {
      path: '/aboutus',
      render: true,
      Element: Aboutus,
    },

    {
      path: '/events/:id',
      render: events,
      Element: SingleEvent,
    },
    {
      path: `/events/buy-done/${BASE_PATH}/:amount/:tickets/:event_id/:nif`,
      render: events,
      Element: FinalizeEventPaymentPage,
    },
    {
      path: '/courses/:id',
      render: courses,
      Element: SingleEvent,
    },
    {
      path: `/courses/buy-done/${BASE_PATH}/:amount/:ong_id/:course_id/:nif`,
      render: courses,
      Element: FinalizeCoursePaymentPage,
    },
    {
      path: '/causes/:id',
      render: causes,
      Element: ProjectDetails,
    },
    {
      path: `/causes/donation-done/${BASE_PATH}/:certificate/:text/:anonymous/:amount/:project_id/:nif`,
      render: causes,
      Element: FinalizeProjectDonationPage,
    },
    {
      path: '/partners',
      render: partners,
      Element: BecomeMemberForm,
    },
    {
      path: `/partners/donation-done/${BASE_PATH}/:certificate/:amount/:ong_id/:nif`,
      render: partners,
      Element: FinalizeSubscriptionDonation,
    },
    {
      path: '/shop',
      render: market,
      Element: Shop,
    },
    {
      path: `/shop/buy-done/${BASE_PATH}/:amount/:productAmount/:product_id/:cp/:city/:country/:address/:nif`,
      render: market,
      Element: FinalizeProductPaymentPage,
    },
    {
      path: '/products/:id',
      render: market,
      Element: SingleProduct,
    },
    {
      path: '/donate',
      render: donations,
      Element: Donate,
    },
    {
      path: `/donate/donation-done/${BASE_PATH}/:certificate/:text/:anonymous/:amount/:nif`,
      render: donations,
      Element: FinalizeDonationPage,
    },
    {
      path: '/volunteers',
      render: volunteers,
      Element: BecomeVolunteerForm,
    },
    {
      path: '/contact',
      render: true,
      Element: ContactusForm,
    },
    {
      path: '/terms_and_conditions',
      render: true,
      Element: TermsAndConditions,
    },
    {
      path: '/*',
      render: true,
      Element: ErrorPage,
    },
  ]

  return (
    <>
      <Routes>
        {ROUTES.map(
          ({ path, render, Element }) => render && <Route key={path} path={path} element={<Element />} />
        )}
      </Routes>
    </>
  )
}
