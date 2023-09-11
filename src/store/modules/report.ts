import { defineStore } from 'pinia'
import { IAbilityLevelDes, IDistrictData, IReport } from '@/type/report'
import {
  getThoughtValuationReportSemester,
  getThoughtValuationReportSingle,
} from '@/api/report'

const SubTitle = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/SubTitle.vue'),
  ),
)
const DistrictName = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/DistrictName.vue'),
  ),
)
const SloganComponent = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/SloganComponent.vue'),
  ),
)
const ActivityName = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/ActivityName.vue'),
  ),
)
const ObjectivesComponent = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/ObjectivesComponent.vue'),
  ),
)
const DomainAbility = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/DomainAbility.vue'),
  ),
)
const QuestionCard = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/QuestionCard.vue'),
  ),
)
const FamilyEducationStrategy = markRaw(
  defineAsyncComponent(
    () =>
      import('@/views/report/components/district/FamilyEducationStrategy.vue'),
  ),
)

const ComplexTitle = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/complex/ComplexTitle.vue'),
  ),
)
const ComplexItem = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/complex/ComplexItem.vue'),
  ),
)
const UserInfo = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/district/UserInfo.vue'),
  ),
)
const RadarChart = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/complex/RadarChart.vue'),
  ),
)
const AssessmentSkills = markRaw(
  defineAsyncComponent(
    () => import('@/views/report/components/complex/AssessmentSkills.vue'),
  ),
)

// 安全高度
const SAFE_HEIGHT = 800
export const useReportStore = defineStore('report', {
  state: (): IReport => {
    return {
      isSingle: true,
      isTeacher: true,
      babyId: '',
      recordId: '',
      babyInfo: {
        babyName: '',
        className: '',
        headImg: '',
        parentId: '',
        schoolName: '',
        sendNumber: 0,
        valuationType: '',
      },
      districtList: [],
      domainList: [],
      radarMapList: [],
      pageList: [],
      pageHeight: 0,
      componentList: [],
    }
  },
  getters: {
    totalPage: state => {
      return state.pageList.length
    },
  },
  actions: {
    getId() {
      return Math.random().toString(16).substring(2, 10)
    },
    formatDomainAbilityName(name: string) {
      if (name) {
        let str = ''
        if (name.endsWith('能力')) {
          str = name.replace(/能力/, '”能力')
          str = '“' + str
        } else {
          str = name
        }
        return str
      }
      return ''
    },
    /**
     * 预估组件高度
     */
    getComponentHeight(component: any, value: any) {
      // console.log(value, 'getComponentHeight.value')
      switch (component) {
        case ComplexTitle:
          return 45
        case RadarChart:
          return 310
        case AssessmentSkills:
          return 245
        case UserInfo:
          return 325
        case SubTitle:
          return 32
        case DistrictName:
          return 43
        case SloganComponent:
          return 30
        case ActivityName:
          return 60
        case ObjectivesComponent:
          return 250
        case DomainAbility:
          return 415
        case QuestionCard:
          return 500
        case FamilyEducationStrategy:
          return 500
        default:
          return 0
      }
    },
    /**
     * 创建 DomainAbility 组件
     */
    createDomain(item: IDistrictData) {
      const {
        abilityLevelDes,
        domainName,
        domainAbilityName,
        abilityName,
        abilityLevelName,
      } = item as IDistrictData

      if (!item.story) {
        item.story = {
          content: null,
          description: null,
          images: null,
          questions: null,
          videos: null,
        }
      }

      const { content, videos, images } = item.story
      const { behave } = abilityLevelDes

      interface Domain {
        isEmpty: boolean
        behave: null | string
        domainName: null | string
        domainAbilityName: null | string
        content: null | string
        abilityName: null | string
        abilityLevelName: null | string
        videos: null | string[]
        images: null | string[]
      }

      const domain: Domain = {
        isEmpty: true,
        behave: null,
        domainName: null,
        domainAbilityName: null,
        content: null,
        abilityName: null,
        abilityLevelName: null,
        videos: null,
        images: null,
      }

      if (domainName) {
        domain.domainName = domainName
        domain.isEmpty = false
      }

      if (domainAbilityName) {
        domain.domainAbilityName =
          this.formatDomainAbilityName(domainAbilityName)
        domain.isEmpty = false
      }

      if (behave) {
        domain.behave = behave
        domain.isEmpty = false
      }

      if (content) {
        domain.content = content
        domain.isEmpty = false
      }

      if (abilityName) {
        domain.abilityName = abilityName
        domain.isEmpty = false
      }

      if (abilityLevelName) {
        domain.abilityLevelName = abilityLevelName
        domain.isEmpty = false
      }

      if (videos) {
        domain.videos = videos
        domain.isEmpty = false
      }

      if (images) {
        domain.images = images
        domain.isEmpty = false
      }

      if (!domain.isEmpty) {
        this.addComponentIfExist(DomainAbility, domain)
        // console.log(domain, 'domain')
      }
    },
    /**
     * 创建 QuestionCard 组件
     */
    createQuestion(item: IDistrictData) {
      const { questionCardUrl, questionCardUrlList } = item
      if (!item.question) {
        item.question = {
          content: null,
          description: null,
          images: null,
          questions: null,
          videos: null,
        }
      }
      const { content, images, videos } = item.question

      interface Question {
        isEmpty: boolean
        questionCardUrl: null | string
        questionCardUrlList: null | string[]
        content: null | string
        images: null | string[]
        videos: null | string[]
      }

      const question: Question = {
        isEmpty: true,
        questionCardUrl: null,
        questionCardUrlList: null,
        content: null,
        images: null,
        videos: null,
      }
      if (questionCardUrl) {
        question.questionCardUrl = questionCardUrl
        question.isEmpty = false
      }

      if (questionCardUrlList) {
        question.questionCardUrlList = questionCardUrlList
        question.isEmpty = false
      }
      if (content) {
        question.content = content
        question.isEmpty = false
      }

      if (images) {
        question.images = images
        question.isEmpty = false
      }
      if (videos) {
        question.videos = videos
        question.isEmpty = false
      }

      if (!question.isEmpty) {
        this.addComponentIfExist(QuestionCard, question)
        // console.log(question, 'question')
      }
    },
    /**
     * 向 componentList 中添加 component
     */
    addComponentIfExist(component: any, value: any) {
      if (value) {
        if (this.pageHeight > SAFE_HEIGHT) {
          this.pushComponents()
        }
        this.pageHeight += this.getComponentHeight(component, value)
        this.componentList.push({
          id: this.getId(),
          view: component,
          value,
        })
      }
    },
    /**
     * 把 componentList 加到 pageList 中，然后重置状态
     */
    pushComponents() {
      this.pageList.push({
        id: this.getId(),
        componentList: this.componentList,
      })
      this.pageHeight = 0
      this.componentList = []
    },
    /**
     * 创建页面及组件
     *
     * 按照区域分成若干个页面，每个页面由组件构成，页面高度超过安全高度时，剩下的组件会重新开一个页面
     */
    createComponent() {
      const { radarMapList, domainList, babyInfo, districtList } = this
      // 综合发展情况
      if (!this.isSingle) {
        this.componentList.push({
          id: this.getId(),
          view: ComplexTitle,
        })
        this.addComponentIfExist(RadarChart, radarMapList)
        this.addComponentIfExist(AssessmentSkills, domainList)

        this.pushComponents()
      } else {
        this.addComponentIfExist(UserInfo, babyInfo)
      }

      // 区域分页
      districtList.map(district => {
        district.dataList.map(item => {
          const {
            subtitle,
            districtName,
            slogan,
            activityName,
            activityDescription,
            abilityLevelDes,
          } = item as IDistrictData
          const { education } = abilityLevelDes as IAbilityLevelDes

          this.addComponentIfExist(SubTitle, subtitle)
          this.addComponentIfExist(DistrictName, districtName)
          this.addComponentIfExist(SloganComponent, slogan)
          this.addComponentIfExist(ActivityName, activityName)
          this.addComponentIfExist(ObjectivesComponent, activityDescription)

          this.createDomain(item)
          this.createQuestion(item)

          this.addComponentIfExist(FamilyEducationStrategy, education)

          this.pushComponents()
        })
      })

      // 综合发展评估
      if (!this.isSingle) {
        this.componentList.push({
          id: this.getId(),
          view: ComplexTitle,
        })
        domainList.map(item => {
          this.addComponentIfExist(ComplexItem, item)
        })

        this.pushComponents()
      }
    },
    /**
     * 获取报告数据
     */
    async getReport() {
      const request = this.isSingle
        ? getThoughtValuationReportSingle
        : getThoughtValuationReportSemester

      const { data, status } = await request({
        babyId: this.babyId,
        recordId: this.recordId,
      })

      if (status === 200) {
        Object.assign(this, { ...data })

        this.createComponent()

        console.log(JSON.parse(JSON.stringify(this.pageList)), 'pageList')
      }
    },
    /**
     * 初始化
     */
    init() {
      const { babyId, recordId, type: _type } = useRoute().query
      Object.assign(this, {
        babyId,
        recordId,
        isSingle: _type === '1' || _type === '2',
        isTeach: _type === '1' || _type === '3',
      })
    },
  },
})
