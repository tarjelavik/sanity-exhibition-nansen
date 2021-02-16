import React from 'react'
import styles from './MunaDocs.css'
//import {SeidhrLogo} from '@seidhr/react-muna-logo'

class MunaDocs extends React.Component {
  render() {
    return (
      <div className={styles.container}>
        <header className={styles.header}>
          <h2 className={styles.title}>ᛗᚢᚾᚨ | MUNA</h2>
        </header>
        <div className={styles.content}>
          {/* <SeidhrLogo style={{display: 'block', margin: 'auto'}} width="8em" height="8em" /> */}
          <p>
            Muna or ᛗᚢᚾᚨ means remember in norse. Muna is a schema and a Studio for Sanity that
            enables detailed descriptions of cultural heritage objects and knowledge about their
            contexts.
          </p>
          <p>
            <a href="https://muna.xyz/docs/model/introduction" target="_blank">
              Muna documentation
            </a>
          </p>
        </div>
      </div>
    )
  }
}

export default {
  name: 'muna-docs-widget',
  component: MunaDocs,
}
