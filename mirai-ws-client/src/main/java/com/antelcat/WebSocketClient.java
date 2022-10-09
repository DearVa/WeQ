package com.antelcat;

import net.mamoe.mirai.console.plugin.jvm.JavaPlugin;
import net.mamoe.mirai.console.plugin.jvm.JvmPluginDescriptionBuilder;
import okhttp3.*;
import org.jetbrains.annotations.NotNull;

import java.util.concurrent.TimeUnit;

public final class WebSocketClient extends JavaPlugin {
    public static final WebSocketClient INSTANCE = new WebSocketClient();

    private WebSocketClient() {
        super(new JvmPluginDescriptionBuilder("com.antelcat.mirai-ws-client", "0.1.0")
                .name("WebSocket Client")
                .author("DearVa")
                .build());
    }

    @Override
    public void onEnable() {
        getLogger().info("WebSocket Client Plugin loaded!");

        OkHttpClient client = new OkHttpClient.Builder()
                .readTimeout(1, TimeUnit.SECONDS)//设置读取超时时间
                .writeTimeout(1, TimeUnit.SECONDS)//设置写的超时时间
                .connectTimeout(1, TimeUnit.SECONDS)//设置连接超时时间
                .build();

        Request request = new Request.Builder().get().url("ws://localhost:13287").build();

        client.newWebSocket(request, new WebSocketListener() {
            @Override
            public void onOpen(@NotNull WebSocket ws, @NotNull Response response) {
                super.onOpen(ws, response);
                ws.send("{ \"type\": \"connect\", \"from\": \"mirai\" }");
            }

            @Override
            public void onMessage(@NotNull WebSocket ws, @NotNull String text) {
                super.onMessage(ws, text);
                //收到消息...（一般是这里处理json）
            }

            @Override
            public void onClosing(@NotNull WebSocket ws, int code, @NotNull String reason) {
                super.onClosing(ws, code, reason);
                getLogger().info("WebSocket closing, exiting...");
                System.exit(0);
            }

            @Override
            public void onClosed(@NotNull WebSocket ws, int code, @NotNull String reason) {
                super.onClosed(ws, code, reason);
                getLogger().info("WebSocket closed, exiting...");
                System.exit(0);
            }

            @Override
            public void onFailure(@NotNull WebSocket ws, @NotNull Throwable throwable, Response response) {
                super.onFailure(ws, throwable, response);
                getLogger().info("WebSocket failure, exiting...");
                System.exit(-1);
            }
        });
    }
}