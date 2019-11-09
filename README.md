# Rebalance Portfolio
This is a practice mini-project for myself to learn HTML, JavaScript and WebAssembly.

Nonlinear optimizaiton is used to rebalance the finantial portfolio, where MATLAB's fmincon is implemented as a form of WebAssembly, through "Generate JavaScript Using MATLAB Coder" version 2.0.2 by Geoff McVittie. The tool allows you to create JavaScript/WebAssembly libraries from MATLAB projects using MATLAB Coder.

You can find the tool here:
https://jp.mathworks.com/matlabcentral/fileexchange/69973-generate-javascript-using-matlab-coder


## 1. Creating your portfolio

Option 1: You can start from [Upload Sample Data] and then add/delete to create your own.

Option 2: Upload csv file. See sampleData2Upload.csv for file format.

When modifying or add 'ticker' the price updates itself.

## 2. Setting budget

Specify the amount that you would like to spend on this rebalancing. Please note that rebalancing will be achieved by buying only.

## 3. Perform optimization

Click [Relabance]
