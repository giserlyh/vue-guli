import request from '@/utils/request'

export default {
  //1.添加课程信息
  addCourseInfo(courseInfo) {
    return request({
      url: `/eduservice/course/addCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  },

  //2.查询所有讲师
  getListTeacher(){
    return request({
      url: `/eduservice/teacher/findAll`,
      method: 'get'
    })
  },

  //3.根据id查询所有课程信息
  getCourseInfoById(id){
    return request({
      url: `/eduservice/course/getCourseInfo/${id}`,
      method: 'get'
    })
  },

  //修改课程信息
  updateCourseInfo(courseInfo){
    return request({
      url: `/eduservice/course/updateCourseInfo`,
      method: 'post',
      data:courseInfo
    })
  },

  //课程确认信息显示
  getPublishCourseInfo(id){
    return request({
      url: `/eduservice/course/getPublishCourseInfo/${id}`,
      method: 'get'
    })
  }
  
}