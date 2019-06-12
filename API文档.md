# API文档

### 1.说明

​	服务器返回的数据全部采用json格式返回，正常情况包含状态码、消息、和数据三个字段。

### 2.用户信息及菜单列表

- /api/user/id

  [解释]：通过用户id获取用户的信息，并将根据用户角色权限返回用户的菜单选项

  [请求示例]：

  http://localhost:8080/api/user/20170101

  [返回示例]：

  ```json
  //学生信息返回示例
  {
      "statu":200,
      "massage":"获取成功",
      "data":{
          "userName":"丁欣怡",
          "teacher":false,
          "sid":"201502010110",
          "major":"计算机科学与技术",
          "class":"计科151班",
          "menulist":[
               {
                  "title": "学生选课",
                  "key": "/select",
                  "children": [
                      {
                          "title": "已选课程",
                          "key": "/course/selected"
                      },
                      {
                          "title": "可选课程",
                          "key": "/course/select"
                      },
                      {
                          "title": "查看课程表",
                          "key": "/course/schedule"
                      }
                  ]
              },
              {
                  "title": "信息维护",
                  "key": "/user",
                  "children": [
                      {
                          "title": "个人信息",
                          "key": "/user/info"
                      },
                      {
                          "title": "修改密码",
                          "key": "/user/password"
                      }
                  ]
              }
          ]
      }
  }
  //教师信息返回示例
  {
      "statu":200,
      "massage":"获取成功",
      "data":{
          "userName":"张厚华",
          "teacher":true,
          "college":"计算机与电子电气工程学院",
           "menulist":[
               {
                  "title": "学生选课",
                  "key": "/select",
                  "children": [
                      {
                          "title": "已选课程",
                          "key": "/course/selected"
                      },
                      {
                          "title": "可选课程",
                          "key": "/course/select"
                      },
                      {
                          "title": "查看课程表",
                          "key": "/course/schedule"
                      }
                  ]
              },
               {
                  "title": "信息维护",
                  "key": "/user",
                  "children": [
                      {
                          "title": "修改密码",
                          "key": "/user/password"
                      }
                  ]
              }
          ]
      }
  }
  ```

  

  [返回说明]

  |  参数   |  说明  |                        备注                         |
  | :-----: | :----: | :-------------------------------------------------: |
  |  code   | 状态码 | 200：成功，500：服务器发生异常，404：未找到个人信息 |
  | massage |  信息  |                                                     |
  |  data   |  数据  |                                                     |

- 用户登录接口

  [接口]：/api/user/login

  [请求方式]：POST

  [携带参数]：

  |   参数   |  类型  |
  | :------: | :----: |
  | username | string |
  | password | string |
  | usertype | string |

  [返回示例]：

  ```json
  {
      "statu": 200,
      "succ": true,
      "message":"login successful"
  }
  ```


- 密码修改

  [接口]：/api/user/password/modify

  [请求方式]：post

  [携带参数]：

  |    参数     |  类型  |  说明  |
  | :---------: | :----: | :----: |
  |     uid     | string | 用户ID |
  |  password   | string | 旧密码 |
  | newPassword | string | 新密码 |


- 获取用户列表

  [接口]：/api/user/all

  [请求方式]：get

  [返回示例]：

  ```json
  {
      "statu": 200,
      "data":[
          {
              "username":"张三",
              "id":"2015010201",
              "usertype":"学生"
          },
          {
              "username":"李四",
              "id":"2015010202",
              "usertype":"学生"
          },
          {
              "username":"王五",
              "id":"2015010202",
              "usertype":"教师"
          }
      ]
  }
  ```

  

### 3.学生相关接口


  + 查询已选课程

  [接口]：/api/student/course/selected/sid/trem

  [解释]：通过学生的学号和指定的学期查询学生的已选课程

  [请求示例]：

  http://localhost:8080/api/student/sourse/selected/20170101/1

  [返回示例]：

```json
{
    "statu":200,
    "massage":"查询成功",
    "data":{
        "duce": "2018-2019", //当前显示的学年
        "duces":[	//可选的学年
            "2017-2018",
            "2016-2017",
            "2015-2016"
        ],
        "term": 1,//当前的学期
        "terms":[//可选的学期
            1,2
        ],
        "cousers": [//已选的课程列表
            {
                "code": "16001422",
                "cname": "毕业实习(计算机)",
                "teacher": "师越",
                "property": "实践课",
                "score": "3.0",
                "duce": "+3",
                "remain": "4",
                "time": "周三第3,4,5节{第1-5周};周三第",
                "place": "203"
            },
            {
                "code": "16500409",
                "cname": "毕业设计（论文）",
                "property": "实践课",
                "score": "13.0",
                "teacher": "前景",
                "duce": "+3",
                "remain": "4",
                "place": "304",
                "time": "周三第3,4,5节{第1-5周};周三第"
            }
        ]
    }
}
```

 -  查询学生可选课程

​	[接口]：/api/student/course/selectable/sid

​	[解释]：根据学生学号查询学生当前学期可选课程，学期不可修改

​	[请求示例]：

​        http://localhost:8080/api/student/course/selectable/201502010110

​	[返回示例]：

```json
{
    "statu":200,
    "massage":"查询成功",
    "data":[
        {
            "code": "16001422",
            "teacher": "张厚华",
            "cname": "毕业实习(计算机)",
            "property": "实践课",
            "score": "3.0",
            "selected":false,
            "duce": "+3",
            "remain": "4"
        },
        {
            "code": "16500409",
            "cname": "毕业设计（论文）",
            "teacher": "师越",
            "property": "实践课",
            "score": "13.0",
            "selected":false,
            "duce": "+3",
            "remain": "4"
        }
    ]
}
```

​	[返回说明]：放回的是一个数组，数组中的每一个对象对应一门课程

|   参数   |   说明   | 备注 |
| :------: | :------: | :--: |
|   code   |  课程号  |      |
|  cname   | 课程名称 |      |
| teacher  | 授课教师 |      |
| property | 课程属性 |      |
|  score   |   学分   |      |
|   duce   |  周学时  |      |
| selected | 是否已选 |      |
|  remain  | 课程余量 |      |

- 查询学生课程表：

  [接口]：/api/course/schedule/sid

  [解释]：通过学生的学号查询学生的课表

  [请求示例]：

  http://localhost:8080/api/course/schedule/201502010110

  [返回示例]：(设计中)

### 4.教师相关接口

- 创建课程

  [接口]：/api/admin/course/create

  [请求方式]：POST

  [提交信息]：

  |  变量名  | 含义 | 值域 | 备注 |
  | :------: | :--: | :--: | :--: |
  | 课程代码 |      |      |      |
  |          |      |      |      |
  |          |      |      |      |


- 获取已创建的课程

  [接口]：/api/admin/course/list/id

  [请求方式]：GET

  [请求示例]：http://localhost:8080/api/admin/course/list/201705454

  [返回示例]：

  ```json
  {
      "statu": 200,
      "massage": "查询成功",
      "data":[
          {
              "code": "16001422",
              "teacher": "张厚华",
              "cname": "毕业实习(计算机)",
              "property": "实践课",
              "score": "3.0",
              "duce": "+3",
              "capacity": "40"
          },
          {
              "code": "16001423",
              "teacher": "张厚华",
              "cname": "毕业设计(计算机)",
              "property": "实践课",
              "score": "3.0",
              "duce": "+3",
              "capacity": "40"
          },
          {
              "code": "16001423",
              "teacher": "张厚华",
              "cname": "MIS系统开发",
              "property": "实践课",
              "score": "3.0",
              "duce": "+3",
              "capacity": "40"
          },
          {
              "code": "16001422",
              "teacher": "张厚华",
              "cname": "计算机组成原理",
              "property": "理论课",
              "score": "3.0",
              "duce": "+3",
              "capacity": "40"
          }
      ]
  }
  ```

  