package com.kaoru.utils;

import com.kaoru.enmus.CustomedHttpCodeEnum;
import com.kaoru.exception.AppSystemException;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.context.request.RequestContextHolder;

import javax.servlet.ServletContext;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.UnsupportedEncodingException;
import java.net.URLEncoder;


public class WebUtils
{
    /**
     * 将字符串渲染到客户端
     * 
     * @param response 渲染对象
     * @param string 待渲染的字符串
     * @return null
     */
    public static void renderString(HttpServletResponse response, String string) {
        try
        {
            response.setStatus(200);
            response.setContentType("application/json");
            response.setCharacterEncoding("utf-8");
            response.getWriter().print(string);
        }
        catch (IOException e)
        {
            e.printStackTrace();
        }
    }


    public static void setDownLoadHeader(String filename, ServletContext context, HttpServletResponse response) throws UnsupportedEncodingException {
        String mimeType = context.getMimeType(filename);//获取文件的mime类型
        response.setHeader("content-type",mimeType);
        String fname= URLEncoder.encode(filename,"UTF-8");
        response.setHeader("Content-disposition","attachment; filename="+fname);

       //    response.setContentType("application/vnd.openxmlformats-officedocument.spreadsheetml.sheet");
       //    response.setCharacterEncoding("utf-8");
    }

    public static Long getUserIDFromSecurityContext() {
        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();
        Object principal = authentication.getPrincipal();
        if (principal instanceof LoginUserDetails) {
            return ((LoginUserDetails) principal).getUser().getId();
        }

        throw new AppSystemException(CustomedHttpCodeEnum.NEED_LOGIN.getCode(), principal.toString());
    }
}