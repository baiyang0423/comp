//设置浏览器自动刷新
fis.config.set('livereload.hostname', '127.0.0.1');
//设置工程包含的目录
fis.config.set('project.include', ['comp_op_web_view/**']);
//设置自动刷新监听的目录
fis.config.set('project.sourcepath', ['/comp_op_web_view']);
//设置发布选项
fis.config.set('roadmap.path',[
	
    //--------------------------------------comp_op_web_view-------------------------------
    
    {
        reg:/^\/comp_op_web_view\/nresource\/(.*)$/i,
        useHash:false,
        release:'/nresource/$1'
    },
    {
        reg:/^\/comp_op_web_view\/component\/(.*)$/i,
        release:'/component/$1'
    },
    {
        reg:/^\/comp_op_web_view\/(.*)$/i,
        release:'$1'
    },
    
    //--------------------------------------------------------------------------------------------
    
    {
        reg:/^\/release\/(.*)$/i,
        release:false
    }
]);
fis.config.set('settings.optimizer.uglify-js', {
    mangle: {
        except: 'exports, module, require, define'
    },
    compress:{
    	drop_console:true
    }
});
fis.config.merge({ 
    modules : { 
        prepackager : { 
            html:'app',
        },
        parser:{
        	tpl : 'tomd',
        }
    } 
});
fis.config.set('modules.prepackager', ['app']);
fis.config.set('modules.postpackager', ['simple','requirejs','autoload','increment']);