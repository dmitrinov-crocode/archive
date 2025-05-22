import styles from './StuduiGuideGuide.module.scss'

import StudioGuideHelper from '../StudioGuideHelper'
import StudioGuideRules from '../StudioGuideRules'

const StuduiGuideGuide = ({helperData, rulesData, active}) => {

  return (
    <div className={styles['studui-guide-guide']}>
      {helperData.map((el, i) => (<StudioGuideHelper data={el.fields} active={active} key={i}/>))}
      {rulesData.map((el, i) => (<StudioGuideRules data={el.fields} key={i}/>))}
      {/* <StudioGuideHelper data={helperData} active={active}/> */}
      {/* <StudioGuideRules data={rulesData}/> */}
    </div>
  )
}

export default StuduiGuideGuide