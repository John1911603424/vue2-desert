<template>
	<div class="grassland">
		<el-card class="box-card">
			<!-- 顶部的面包屑 -->
			<div slot="header" class="clearfix">
				<el-breadcrumb separator-class="el-icon-arrow-right">
					<el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
					<el-breadcrumb-item>草原资源管理</el-breadcrumb-item>
				</el-breadcrumb>
			</div>
			
			<el-card class="box-card">
				<div slot="header" class="clearfix">
					<!-- 新增按钮 -->
					<el-button type="primary" icon='el-icon-plus' @click='dialogCreate="true"'>新增</el-button>
					<!-- 删除按钮 -->
					<el-button type="primary" icon='el-icon-delete' >删除</el-button>
					<!-- 刷新按钮 -->
					<el-button type="primary" icon='el-icon-refresh' >刷新</el-button>
					<!-- 导出按钮 -->
					<el-button type="primary" icon='el-icon-folder-opened' >导出</el-button>
					<!-- 导入按钮 -->
					<el-button type="primary" icon='el-icon-upload' >导入</el-button>
					<!-- 打印按钮 -->
					<el-button type="primary" icon='el-icon-printer' >打印</el-button>
				</div>
				<!-- 列表页 -->
				<el-table :data="geoinfoList" style="width: 100%;margin-bottom: 10px;">
					<el-table-column type="selection" width="55"></el-table-column>
					<el-table-column prop="id" label="ID" width="80" sortable>
					</el-table-column>
					<el-table-column prop="name" label="地貌类型" width="200">
					</el-table-column>
					<el-table-column prop="desc" label="坡度" width="280">
					</el-table-column>
					<el-table-column prop="leader" label="高程" width="100" sortable>
					</el-table-column>
					<el-table-column prop="tester" label="水文特征" width="100">
					</el-table-column>
					<el-table-column prop="interfaces" label="土壤类型" width="120" sortable>
					</el-table-column>
					<el-table-column prop="testcases" label="植被类型" width="80">
					</el-table-column>
					<el-table-column prop="testsuits" label="备注" width="80">
					</el-table-column>
					<el-table-column label="操作">
						<template slot-scope="scope">
							<el-button size="mini" @click="proEdit(scope.row)">编辑</el-button>
							<el-button size="mini"  @click="proView(scope.row)">查看</el-button>
							<el-button size="mini" type="danger" @click="proDelete(scope.row.id)">删除</el-button>
						</template>
					</el-table-column>
				</el-table>
				<!-- 项目翻页管理 -->
				<el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange"
					:current-page="page" :page-sizes="[5, 10, 20, 30]" :page-size="size"
					layout="total, sizes, prev, pager, next, jumper" :total="count">
				</el-pagination>
			</el-card>
		</el-card>

		<!-- 编辑项目的弹框 -->
		<el-dialog title="编辑" :visible.sync="dialogEdit">
			<el-form :model="editProject" :rules="caseRules" ref='updateRef' label-width="80px">
				<el-form-item label="地貌类型" prop="name">
					<el-input v-model="editProject.name" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="坡度" prop="leader">
					<el-input v-model="editProject.leader" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="高程" prop="tester">
					<el-input v-model="editProject.tester" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="水文特征"  prop="programmer">
					<el-input v-model="editProject.programmer" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="土壤类型" prop="publish_app">
					<el-input v-model="editProject.publish_app" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" v-model="editProject.desc" autocomplete="off"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogEdit = false">取 消</el-button>
				<el-button type="primary" @click="updateProject">确 定</el-button>
			</div>
		</el-dialog>
		<!-- 新增的弹框 -->
		<el-dialog :visible.sync="dialogCreate" :rules="caseRules" ref='createRef'>
			<template slot='title'>
				<div style="text-align: center;width: 100%;font-size: 24px;">新增</div>
			</template>
			<el-form :model="newProject" label-width="80px" size='mini' :rules="caseRules" ref='createRef'>
				<el-form-item label="地貌类型" prop="name">
					<el-input v-model="newProject.name"></el-input>
				</el-form-item>
				<el-form-item label="坡度" prop="tester">
					<el-input v-model="newProject.tester" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="高程" prop="leader">
					<el-input v-model="newProject.leader" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="水文特征" prop="programmer">
					<el-input v-model="newProject.programmer" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="土壤类型" prop="publish_app">
					<el-input v-model="newProject.publish_app" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="备注">
					<el-input type="textarea" :rows="5" v-model="newProject.desc"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogCreate = false">取 消</el-button>
				<el-button type="primary" @click="createProject=false">提 交</el-button>
			</div>
		</el-dialog>
		<!-- 查看的弹框 -->
		<el-dialog :visible.sync="dialogView">
			<template slot='title'>
				<div style="text-align: center;width: 100%;font-size: 24px;">查看</div>
			</template>
			<el-form :model="viewProject" label-width="80px" size='mini'>
				<el-form-item label="地貌类型" prop="name">
					<el-input v-model="viewProject.name" autocomplete="off" :readonly="true"></el-input>					
				</el-form-item>
				<el-form-item label="坡度" prop="tester">
					<el-input v-model="viewProject.tester" autocomplete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="高程" prop="leader">
					<el-input v-model="viewProject.leader" autocomplete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="水文特征" prop="programmer">
					<el-input v-model="viewProject.programmer" autocomplete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="土壤类型" prop="publish_app">
					<el-input v-model="viewProject.publish_app" autocomplete="off" :readonly="true"></el-input>
				</el-form-item>
				<el-form-item label="植被类型">
					<el-input type="textarea" :rows="5" v-model="viewProject.desc" :readonly="true"></el-input>
				</el-form-item>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button @click="dialogView = false">关闭窗口</el-button>
			</div>
		</el-dialog>
	</div>
</template>

<script>
	export default {
		data() {
			return {
				geoinfoList: [],				
				// 当前选择的页码
				page: 1,
				// 数据总数
				count: 0,
				//每页的数据量
				size: 10,
				//编辑窗口显示
				dialogEdit: false,
				editProject: {},
				//查看窗口显示
				dialogView: false,
				viewProject: {},
				//创建项目
				dialogCreate: false,
				newProject: {
					name: '',
					leader: '',
					tester: '',
					programmer: '',
					publish_app: '',
					desc: ''
				},
				// 校验规则
				caseRules: {
					name: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}],
					leader: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}, ],
					tester: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}, ],
					programmer: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}, ],
					publish_app: [{
						required: true,
						message: '不能为空',
						trigger: 'blur'
					}, ]
				}

			}
		},
		created() {
			this.createRandomArrayDict();
		},
		methods: {	
			createRandomArrayDict() {
				const min = 5; // 随机数组的最小长度
				const max = 20; // 随机数组的最大长度
				const length = Math.floor(Math.random() * (max - min + 1)) + min;
				let arrayDict = [];
				for (let i = 0; i < length; i++) {
					let obj_dic = {'id': `测试${i}`,
					name: `测试${i}`,
					desc: `测试${i}`,
					leader: `测试${i}`,
					tester: `测试${i}`,
					interfaces: `测试${i}`,
					testcases: `测试${i}`,
					testsuits: `测试${i}`
				}
					arrayDict.push(obj_dic);
				}				
      			this.geoinfoList = arrayDict;;
			},

			// 创建项目的方法
			createProject() {
				// 发送请求之前对表单进行预验证
				this.$refs.createRef.validate(async (valid) => {
					if (!valid) return
					// 验证通过，发送请求
					const response = await this.$request.post('/projects/', this.newProject)
					if (response.status === 201) {
						this.$message({
							type: 'success',
							message: '项目创建成功!',
							duration: 1000
						});
						// 更新页面的数据
						this.getProject()
						// 关闭弹框
						this.dialogCreate = false
					} else {
						console.log(response)
						this.$message.error('服务端异常!')
					}

				})
			},
			// 编辑项目
			proEdit(value) {
				console.log(value)
				// 把接收到的项目数据，
				this.editProject = {
					...value
				}
				// 显示编辑框
				this.dialogEdit = true
			},
			// 查看项目
			proView(value) {
				console.log(value)
				// 把接收到的项目数据，
				this.viewProject = {
					...value
				}
				// 显示编辑框
				this.dialogView = true
			},
			// 请求修改项目的接口
			async updateProject() {
				// 发送请求之前对表单进行预验证
				this.$refs.updateRef.validate(async (valid) => {
					if (!valid) return
					const response = await this.$request.put('/projects/' + this.editProject.id + '/', this
						.editProject)
					if (response.status === 200) {
						this.$message({
							message: '修改项目成功',
							type: 'success',
							duration: 1000
						})
						this.getProject()
						this.dialogEdit = false
					} else {
						this.$message({
							message: '修改失败',
							type: 'error',
							duration: 1000
						})
					}
				})
			},


			// 删除项目
			async proDelete(id) {
				console.log('当前删除的数据id为：', id)
				// 通过接口删除后端数据
				const response = await this.$request.delete('/projects/' + id + '/')
				//  后端接口是安装resetful规范设计的，delete方法成功时，返回的状态码为204
				if (response.status === 204) {
					// 删除成功
					this.$message({
						message: '删除成功',
						type: 'success',
						duration: 1000
					});
					// 重写加载数据
					this.getProject()
				} else {
					this.$message({
						message: '删除失败',
						type: 'error',
						duration: 1000
					});
				}
			},
			// 获取项目
			async getProject() {
				// 请求项目列表的接口，获取所有的项目
				const response = await this.$request.get('/projects/', {
					params: {
						page: this.page,
						size: this.size
					}
				})
				if (response.status !== 200) return this.$message.error('服务器异常')
				// 保存接口返回的项目列表
				this.projectList = response.data.results
				// 保存数据总数
				this.count = response.data.count
				console.log(response)
			},
			// 处理每页数量大小变化的方法
			handleSizeChange(size) {
				this.size = size
				this.page = 1
				this.getProject()
			},
			// 处理页码变化的方法
			handleCurrentChange(page) {
				this.page = page
				this.getProject()
			}
		},

		// vue实例数据挂载之后，出触发这个钩子函数
		mounted() {
			this.getProject()
		}

	}
</script>

<style>
</style>
