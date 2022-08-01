import { ReactElement } from 'react'
import styled from 'styled-components'
import { Carousel } from '../common'

interface IProps {
  imgs: { id: string; img_url: string }[];
  isLoading?: boolean;
}

export function EventCarousel({ imgs, isLoading }: IProps): ReactElement {
  return (
    <>
      {isLoading && <h1>Loading</h1>}
      {!isLoading && (
        <Carousel dots>
          {imgs?.map((img) => (
            <ImageContainer key={img.id}>
              <img src={img.img_url} alt={img.id} />
            </ImageContainer>
          ))}
        </Carousel>
      )}
    </>
  )
}

const ImageContainer = styled.div`
  width: 817px;
  height: 420px;

  img {
    max-width: 100%;
    width: 100% !important;
    height: 420px;
  }
`

EventCarousel.defaultProps = {
  isLoading: false,
}
