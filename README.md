# Aurora情绪树洞
---
## 项目介绍
**Aurora情绪树洞**是面向大学生为其提供心理健康辅助和情绪宣泄的网站。一个辅助大学生心理健康的平台，舒服的页面设计以及良好的交互效果必不可少，本系统通过问卷调查以及走访的方式询问了诸多大学生以及心理老师对于此系统开发的意见，也在知网上搜寻了许多关于色彩对于不同心理疾病的影响。网站还使用了大量的动态交互效果，增强了与大学生之间互动性。

### 项目实现
<div style="display:flex">
  <table >
    <tr>
      <th colspan="2">前端</th>
    </tr>
    <tr>
      <td>Vue2.0框架</td>
      <td>Element-UI组件库</td>
    </tr>
  </table>

  <table >
    <tr>
      <th colspan="2">后端</th>
    </tr>
    <tr>
      <td>Spring Boot框架</td>
      <td>Redis数据库</td>
    </tr>
  </table>
</div>

### 功能模块介绍
1. 利用推荐算法，根据用户的**近期情绪动态**，向大学生**推荐**对应的电影和书籍。
2. 提供**心愿墙**功能，让大学生从孤独的个体心愿感受到群体的共同努力氛围，达到激励用户积极向上的效果。
3. 提供**目标打卡**功能，完成目标获得激励人心的反馈，促进大学生有信心面对问题。
4. 提供**治愈弹窗**功能，在用户发表了消极动态，系统会虚拟鼓励用户，通过不同的鼓励语录对用户产生不同的激励效果。


### 功能模块展示
1. **登录模块**
![alt](https://gitee.com/tkey20/aurora/raw/master/gif/login.gif)

1. **社区页以及主页**
 * 社区页可查看所有人发表过的动态

![alt](https://gitee.com/tkey20/aurora/raw/master/gif/mainPage.gif)

3. **推荐动态、书籍、电影模块**
  * 推荐模块会根据用户当天选择的心情以及发表的动态的变化而实时推荐。
  * 点击爱心可以收集当前用户的情绪对于推荐喜爱，下次对于当前情绪的用户会优先推送这些推荐内容。
  
![alt](https://gitee.com/tkey20/aurora/raw/master/gif/recommand.gif)

1. **小目标打卡功能**
* 完成目标获得激励人心的反馈，促进大学生有信心面对问题。
![alt](https://gitee.com/tkey20/aurora/raw/master/gif/小目标.gif)

4. **发布动态功能**
* 发布成功后会识别用户是消极的情绪还是开心的情绪，并采取对应措施。
* 识别到积极情绪，推荐模块的动态页也会实时推荐相似情绪的动态，引起共鸣。
  ![alt](https://gitee.com/tkey20/aurora/raw/master/gif/发布.gif)

* 识别到消极情绪，提供治愈弹窗功能，系统会虚拟鼓励用户，通过不同的鼓励语录对用户产生不同的激励效果。
  ![alt](/tkey20/aurora/raw/master/gif/%E6%B6%88%E6%9E%81%E5%8F%91%E5%B8%83.gif)

5. **心愿模块**
  ![alt](https://gitee.com/tkey20/aurora/raw/master/gif/wish.gif)

6. **个人信息设置模块**
![alt](https://gitee.com/tkey20/aurora/raw/master/gif/user.gif)
