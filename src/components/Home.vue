<template>
	<el-container class="home-container">
		<!-- 页面顶部 -->
		<el-header>
			<div class="title">
				防 止 沙 漠 化 管 理 系 统
			</div>
			<div class="logonout">
				<el-popconfirm title="确认退出登录？" @confirm='loginout()'>
					<div slot="reference">退出登录</div>
				</el-popconfirm>
			</div>
		</el-header>
		<el-container>
			<!-- 侧边菜单栏 -->
			<el-aside width="250px" style='overflow: auto;'>
				<el-menu :router='rou' background-color='#003755' class="el-menu-demo" :default-active='activeMenu'
					text-color="#fff" active-text-color="#00aaff" unique-opened>
					<!-- 基础信息管理 -->
					<el-menu-item index="/geoinfo">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>基础信息管理</span>
						</template>
					</el-menu-item>
					<!-- 草原资源管理 -->
					<el-menu-item index="/grassland">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>草原资源管理</span>
						</template>
					</el-menu-item>
					<!-- 气象分析 -->
					<el-menu-item index="/geoinfo1">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>气象分析</span>
						</template>
					</el-menu-item>
					<!-- 荒漠化综合评价  -->
					<el-menu-item index="/geoinfo2">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>荒漠化综合评价</span>
						</template>
					</el-menu-item>
					<!-- 荒漠化监测预警 -->
					<el-menu-item index="/geoinfo3">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>荒漠化监测预警</span>
						</template>
					</el-menu-item>
					<!-- 决策支持 -->
					<el-menu-item index="/geoinfo4">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>决策支持</span>
						</template>
					</el-menu-item>
					<!-- 成效评估 -->
					<el-menu-item index="/geoinfo5">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>成效评估</span>
						</template>
					</el-menu-item>
					<!-- 统计分析 -->
					<el-menu-item index="/statistic">
						<template slot="title">
							<i class="el-icon-notebook-1"></i>
							<span>统计分析</span>
						</template>
					</el-menu-item>										
				</el-menu>
			</el-aside>
			<!-- 主体内容显示区域 -->
			<el-main style='overflow: auto; padding: 0 5px;'>
				<router-view></router-view>
			</el-main>
		</el-container>
	</el-container>
</template>

<script>
	/*
	退出登录的实现
	1、点击退出登录按钮，触发点击事件
	2、在处理函数中，删除sessionStorage中的token,并将路由重定向到login页面
	
	*/

	export default {
		data() {
			return {
				rou: true,
				activeMenu:'/dgeoinfo',
				
			}
		},
		methods: {
			// 退出登录的方法
			loginout() {
				window.sessionStorage.removeItem('token')
				this.$router.push('/login')
			}
		},

	}
</script>

<style scoped>
	.home-container{
		height: 100vh;
	}

	/* --------页面顶部的样式-------- */
	.el-header {
		background: #1685c2;
		height: 70px;
		margin-bottom: 5px;
	
	}
	.el-aside {
    	background-color: #003755;
		height: calc(100vh - 75px); /* 设置左侧 aside 高度 */
	}
  

	.el-main {
		background-color: #EAEDF1;
		height: calc(100vh - 75px); /* 设置主体 main 高度 */
  		overflow: auto; /* 启用main的滚动条 */
	}

	.title {
		width: 90%;
		color: #fff;
		font: normal 28px/60px "microsoft yahei";
		text-align: center;
		float: left;
	}

	.logonout {
		width: 60px;
		color: #fff;
		font: normal 14px/60px "microsoft yahei";
		float: right;
		text-align: center;
	}

	.logonout:hover {
		background: #000;
	}

	/* ----------侧边菜单的样式---------- */
	/* .el-menu {
		height: 100vh;
	} */
</style>
