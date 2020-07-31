import request from '@/utils/request'

export default {
  //1.讲师列表
  getTeacherList(current, limit, teacherQuery) {
    return request({
      url: `/eduservice/teacher/pageTeacherCondition/${current}/${limit}`,
      method: 'post',
      //teacherQuery，后端使用RequestBody获取数据
      //data表示把对象转换json传递到接口里面
      data: teacherQuery
    })
  },
  //删除
  deleteTeacherId(id) {
    return request({
      url: `/eduservice/teacher/${id}`,
      method: 'delete'
    })
  },

  //添加讲师
  addTeacher(teacher) {
    return request({
      url: `/eduservice/teacher/addTeacher`,
      method: 'post',
      data:teacher
    })
  },

  //获得讲师列表
  getTeacherInfo(id){
    return request({
      url: `/eduservice/teacher/getTeacher/${id}`,
      method: 'get'
    })
  },
  //修改讲师
  updateTeacher(teacher){
    return request({
      url: `/eduservice/teacher/updateTeacher`,
      method: 'post',
      data:teacher
    })
  }
}
