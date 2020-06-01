# Rebalance Portfolio

[![View Rebalance your financial portfolio on browser on File Exchange](https://www.mathworks.com/matlabcentral/images/matlab-file-exchange.svg)](https://jp.mathworks.com/matlabcentral/fileexchange/75169-rebalance-your-financial-portfolio-on-browser)

Copyright (c) 2019-2020 Michio Inoue


This is a practice mini-project to learn HTML, JavaScript and WebAssembly.

Nonlinear optimization is used to rebalance the financial portfolio, where MATLAB's fmincon is implemented as a form of WebAssembly, through "Generate JavaScript Using MATLAB Coder" version 2.0.2 by Geoff McVittie. The tool allows you to create JavaScript/WebAssembly libraries from MATLAB projects using MATLAB Coder.

You can find the tool here:
https://jp.mathworks.com/matlabcentral/fileexchange/69973-generate-javascript-using-matlab-coder


### Step 1. Creating your portfolio

Option 1: You can start from [Upload Sample Data] and then add/delete to create your own.

Option 2: Upload csv file. See sampleData2Upload.csv for file format.

You can modify "ticker", "qty", and "target%" only. When modifying or add 'ticker' the price updates itself. 

### Step 2. Setting budget

Specify the amount that you would like to spend on this rebalancing. Please note that rebalancing will be achieved by buying only.

### Step 3. Perform optimization

Click [Rebalance]

![Step1toStep3](https://github.com/minoue-xx/rebalance_portfolio/blob/master/portolioRebalance_videoEN.gif)

