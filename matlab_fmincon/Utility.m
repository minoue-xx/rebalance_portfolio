% https://wasm-dev-book.netlify.com/hello-wasm.html
% 注意点として Fetch API は file URI Scheme[4]をサポートしていないため, 
% 任意の HTTP サーバで index.html と js, wasm を
% 配信してファイルに http URI Scheme でアクセスできるようにする必要があります. 
%% step1
proj = webcoder.setup.project("optimizePosition","Directory",pwd,"OutputType",'dll');
%% step2
proj = openProject(pwd);
webcoder.build.project(proj);

%% step3
% on dist folder
server = webcoder.utilities.DevelopmentServer("Port",8125);
start(server);
web('http://localhost:8125')
%%
stop(server);