'use client'

import styles from './GideFilter.module.scss'

import Container from '@/Components/Container'
import GideTags from '../GideTags'
import { ChevronIcon } from '../../../../public/svg'
import { useState, useEffect, useRef } from 'react'

const GideFilter = ({tags = [], activeTags, setActiveTags}) => {
  const [filterIsOpen, setFilterIsOpen] = useState(false)
  const filterRef = useRef(null)

  const filterToggle = () => {
    setFilterIsOpen(prev => !prev)
  }

  const closeFilterList = (e) => {
    if (filterRef.current && !filterRef.current.contains(e.target)) {
      setFilterIsOpen(false)
    }
  }

  const addTags = (tag) => {
    setActiveTags(prev => [...prev, tag])
  }

  const deleteTags = (tag) => {
    setActiveTags(prev => {
      return prev.filter(activeTag => activeTag != tag)
    })
  }

  useEffect(() => {
    window.addEventListener('click', closeFilterList)

    return () => {
      window.removeEventListener('click', closeFilterList)
    }
  }, [])

  return (
    <section className={styles['gide-filter']}>
      <Container size='xl'>
        <div className={`${styles['gide-filter__wrapper']} ${filterIsOpen ? styles['gide-filter__wrapper--bg'] : ''} ${activeTags.length ? styles['gide-filter__wrapper--select'] : ''}`}>

          <div ref={filterRef} className={`${styles['gide-filter__filter']} ${!activeTags.length ? styles['gide-filter__filter--down'] : ''}`}>
            <div className={styles['gide-filter__filter-inner']}>
              <button type='button' className={styles['gide-filter__filter-header']} onClick={filterToggle}>
                <span className={styles['gide-filter__filter-header-text']}>Выберите фильтры</span>
                <span className={styles['gide-filter__filter-header-icon']}><ChevronIcon/></span>
              </button>
              {filterIsOpen && (
                <ul className={styles['gide-filter__filter-list']}>
                  {tags.map((tag, i) => (
                    <li className={`
                      ${styles['gide-filter__filter-item']} 
                      ${(activeTags.find(activeTag => activeTag == tag)) ? styles['gide-filter__filter-item--active'] : ''}`} 
                      key={i} 
                      onClick={() => addTags(tag)}>
                      {tag}
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>

          <GideTags activeTags={activeTags} deleteTagHandler={deleteTags}/>
        </div>
      </Container>
    </section>
  )
}

export default GideFilter