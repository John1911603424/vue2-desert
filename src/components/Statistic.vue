<template>
<div class="statistic">
    <el-card class="card-container">
        <!-- 顶部的面包屑 -->
        <div slot="header" class="clearfix">
            <el-breadcrumb separator-class="el-icon-arrow-right">
                <el-breadcrumb-item :to="{ path: '/' }">首页</el-breadcrumb-item>
                <el-breadcrumb-item>统计分析</el-breadcrumb-item>
            </el-breadcrumb>
        </div>
        
        
            
        <!--echarts统计图-->
        <el-row :gutter="20">
            <el-col :span="12">
            <el-card class="box-card">
                <!-- 顶部的面包屑 -->
                <div slot="header" class="clearfix">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>自定义柱状图</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <bar1 />
            </el-card>
            </el-col>
            <el-col :span="12">
            <el-card class="box-card">
                <!-- 顶部的面包屑 -->
                <div slot="header" class="clearfix">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>自定义饼图</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <pie1 />
            </el-card>
            </el-col>
        </el-row>
        <el-row :gutter="20">
            <el-col :span="12">
            <el-card class="box-card">
                    <!-- 顶部的面包屑 -->
                    <div slot="header" class="clearfix">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>自定义柱状图</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <bar1 />
            </el-card>
            </el-col>
            <el-col :span="12">
            <el-card class="box-card">
                    <!-- 顶部的面包屑 -->
                    <div slot="header" class="clearfix">
                    <el-breadcrumb separator-class="el-icon-arrow-right">
                        <el-breadcrumb-item>自定义饼图</el-breadcrumb-item>
                    </el-breadcrumb>
                </div>
                <pie1 />
            </el-card>
            </el-col>
        </el-row>				
        
    </el-card>      
    </div>
  </template>
   
  <script>
  import bar1 from '../echarts/bar'
  import pie1 from '../echarts/pie'  
   
  export default {
    name: 'statistic',
    components: {
        bar1,
        pie1,
    }
  }
</script>
   
<style scoped>
    .el-card{
        margin-bottom: 20px;
        text-align: center;
    }   
    .card-container{
        margin-bottom: 0px;
	}
</style>