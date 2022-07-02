import { Card } from 'antd'
import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

const { Meta } = Card

interface ICourseCard {
  course: {
    src: string;
    title: string;
    description: string;
  };
}

const CourseCard = ({ course }: ICourseCard) => (
  <CustomCard cover={<img alt="course" src={course.src} />} hoverable>
    <Meta title={course.title} description={course.description} />

    <div style={{ textAlign: 'right' }}>
      <CustomLink to="/">Read more</CustomLink>
    </div>
  </CustomCard>
)

export default CourseCard

const CustomLink = styled(Link)`
  border-bottom: 1px solid black;
  color: black;
`

const CustomCard = styled(Card)`
  max-width: 37.5em;
  display: flex;
  flex-direction: row;
  align-items: center;
  box-shadow: 0 0 5px 0px #aaa;

  .ant-card-cover img {
    width: 100%;
    padding: 0.7rem;
  }
`
