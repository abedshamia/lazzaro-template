import React, { ReactElement } from 'react'
import { useLocation } from 'react-router-dom'
import styled from 'styled-components'
import { getEventsURL } from '../../api/getApiServices'
import { Footer, Navbar } from '../../components'
import { EventCard } from '../../components/SingleEvent/EventCard'
import { SingleEventDetails } from '../../components/SingleEvent/SingleEventDetails'
import { useAppSelector, useDependant } from '../../hooks'

export function SingleEvent(): ReactElement {
  const ongId = useAppSelector((state) => state.ong.ongId)
  const { data: events, isLoading } = useDependant(getEventsURL(ongId), ['events'], ongId)
  const { pathname } = useLocation()
  const isEvent = pathname.startsWith('/events')
  const isCourse = pathname.startsWith('/courses')

  return (
    <>
      <Navbar />
      <Container>
        <SingleEventDetails />
        <OtherEvents>
          {isLoading && <h1>Loading other events...</h1>}

          {isEvent
            && events
              ?.map((event: any) => !event.course && <EventCard {...event} key={event.id} />)}

          {isCourse
            && events
              ?.map((event: any) => event.course && <EventCard {...event} key={event.id} />)}
        </OtherEvents>
      </Container>
      <Footer />
    </>
  )
}

const Container = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 0 4.2rem;
  gap: 4.2rem;
  margin-top: 3.2rem;

  @media screen and (max-width: 768px) {
    flex-direction: column;
    align-items: center;
    
  }
`

const OtherEvents = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1;
  height: 75rem;
  gap: 1.2rem;
  overflow-y: auto;
`
