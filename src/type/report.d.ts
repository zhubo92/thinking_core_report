export interface IBabyInfo {
  babyName: null | string
  className: null | string
  headImg: null | string
  parentId: null | string
  schoolName: null | string
  sendNumber: null | number
  valuationType: null | string
}

export interface IAbilityLevelDes {
  behave: null | string
  education: null | string
  growth: null | string
  tactics: null | string
}

interface IStory {
  content: null | string
  description: null | string
  images: null | string[]
  questions: null | string[]
  videos: null | string[]
}

interface IQuestion {
  content: string | null
  description: null | string
  images: null | string[]
  questions: null | string[]
  videos: null | string[]
}

interface IDistrictData {
  abilityId: string
  abilityLevelDes: IAbilityLevelDes
  abilityLevelId: string
  abilityLevelName: string
  abilityLibraryId: any
  abilityName: string
  activityDescription: string
  activityId: string
  activityName: string
  babyId: string
  createTime: string
  districtId: string
  districtName: string
  domainAbilityId: string
  domainAbilityName: any
  domainId: string
  domainName: string
  id: string
  question: IQuestion | null
  questionCardUrl: null | string
  questionCardUrlList: null | string[]
  slogan: string
  story: IStory | null
  subtitle: string
  valuationDate: string
  valuationId: string
  valuationRecordId: string
  valuationType: string
}

interface IDistrict {
  dataList: IDistrictData[]
  districtName: string
  slogan: string
  subtitle: string
}

interface ILevel {
  abilityLevelName: string
  abilityName: string
}

interface IAbility {
  domainAbilityName: string
  level: ILevel
}

interface IDomain {
  abilityList: IAbility[]
  domainName: string
}

interface IRadarMap {
  max: number
  name: string
  value: number
}

export interface IComponent {
  id: string | number
  view: any
  value?: any
}

export interface IPage {
  id: string | number
  componentList: IComponent[]
}

export interface IReport {
  isSingle: boolean
  isTeacher: boolean
  babyId: string | null
  recordId: string | null
  babyInfo: IBabyInfo
  districtList: IDistrict[]
  domainList: IDomain[]
  radarMapList: IRadarMap[]
  // 当前页面高度
  pageHeight: number
  // 要渲染的页面列表
  pageList: IPage[]
  // 当前页面的组件列表
  componentList: IComponent[]
}
