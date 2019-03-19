import React, { Component } from 'react'
import Styled from 'styled-components'

const AboutWrap = Styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 15% 10% 10% 10%;
  @media screen and (min-width: 1000px) {
    padding: 20%;
  }
    h1, p{
      color: white;
    }
`

export default class About extends Component {
  render() {
    return (
      <React.Fragment>
        <AboutWrap>
          <div>
          <h1>Outer space is the cosmic relative of a dream.</h1>
          <p>Deep Sleep is a musical concept project from individuals who see sleep as an unexplored frontier. The music is based around the way an individual sleeps and the dreams or nightmares that find them when they rest. Subjects include a newly homeless youth staying at a shelter for the first time, a school teacher who suffers from night terrors, and an investment banker who has just given away all their assets in preparation for the rapture. This space will be updated with music in the near future. Sleep well. </p>
        </div>  
      </AboutWrap>
      </React.Fragment>
    )
  }
}