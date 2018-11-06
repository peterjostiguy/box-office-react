import React from 'react'
import {CreateLeague} from './createLeague'
import database from '../firebase'

export class Header extends React.Component {

  render() {

    return (
      <div className={'header'}>
        <h1><a className={'site-name'} href='/'>Fantasy Box Office</a></h1>
      </div>
    )

  }

}
