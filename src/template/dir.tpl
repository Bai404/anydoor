<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8" />
    <title>{{title}}</title>
    <style type="text/css">
        body {
            margin:30px;
        }
        a{
            display: inline-block;
        }
    </style>
</head>
<body>
{{#each files}}
    <a href="{{../dir}}/{{this}}">{{this}}</a>
{{/each}}
</body>
</html>