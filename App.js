import React, { useState, useEffect } from 'react';
import { View, Text, Button } from 'react-native';
import styled from 'styled-components/native';

const Page = styled.SafeAreaView`
flex:1;
align-items: center;
`;
const HeaderText = styled.Text`
  width: 100%;
  font-size: 25px;
  background-color: #008000;
  text-align: center;
  padding: 10px;
  color: #FFFFFF;
  margin-bottom: 50px;
`;
const Input = styled.TextInput`
  width: 80%;
  height: 50px;
  font-size: 18px;
  background-color: #EEEEEE;
  border-radius: 10px;
  padding: 10px;
  margin-bottom: 30px;
`;
const CalcButton = styled.Button`
  margin-top:10px;
`;
const ResultArea = styled.View`
  width: 60%;
  margin-top: 30px;
  background-color: #EEEEEE;
  padding: 20px 20px 50px 20px;
  justify-content: center;
  align-items: center;
`;
const ItemTitle = styled.Text`
  font-size: 15px;
  margin-top:20px;
  text-align: left;
  font-weight: bold;
`;
const ResultTitleSl = styled.Text`
  font-size: 22px;
  font-weight: bold;
`;
const ResultSl = styled.Text`
  font-size: 22px;
  font-weight: bold;
  color: #4169E1;
`;
const ResultTitle = styled.Text`
  font-size: 16px;
  font-weight: bold;
  margin-top: 30px;
`;
const Result = styled.Text`
  font-size: 14px;
  font-weight: bold;
`;


export default () => {

  const [ salarioBr, setSalarioBr ] = useState(0);
  const [ outrosDesc, setOutrosDesc ] = useState(0);
  const [ inss, setInss ] = useState(0);
  const [ salarioLiquido, setSalarioLiquido ] = useState(0);
  const [ salarioDesc, setSalarioDesc ] = useState(0);
  const [ irrf, setIrrf ] = useState(0);

  const calc = () => {
    var vSalario = parseFloat(salarioBr);
    var vOutrosDesc = parseFloat(outrosDesc);

    if(vSalario <= 1039) {
      setInss(0.08)
    } else if(vSalario > 2919.72) {
      setInss(0.11);
    } else {
      setInss(0.09);
    }
    
    setSalarioDesc(vSalario - (inss * vSalario))

    if(salarioDesc > 1903.98 && salarioDesc <= 2826.65){
      setIrrf(0.075);
    } else if(salarioDesc > 2926.65 && salarioDesc <= 3751.05){
      setIrrf(0.15);
    } else if(salarioDesc > 3751.05 && salarioDesc <= 4664.68){
      setIrrf(0.225);
    } else if(salarioDesc > 4464.68){
      setIrrf(0.275);
    }else{
      setIrrf(0);
    }

    setSalarioLiquido(salarioDesc - (irrf * salarioDesc) - vOutrosDesc)
  }

  useEffect(()=>{
    calc();
  }, [salarioDesc]);

  return (
    <Page>
      <HeaderText>Calculadora de Salário Líquido</HeaderText>
      <ItemTitle>Valor do salário bruto</ItemTitle>
      <Input 
        placeholder="Salário bruto R$ 0.00"
        keyboardType="numeric"
        value={salarioBr}
        onChangeText={sb=>setSalarioBr(sb)}
      />
      <ItemTitle>Outros Descontos</ItemTitle>
      <Input 
        placeholder="Outros descontos R$ 0.00"
        keyboardType="numeric"
        onChangeText={oDesc=>setOutrosDesc(oDesc)}
      />

      <CalcButton title="Calcular" onPress={calc} />

      {salarioLiquido > 0 &&
      <ResultArea>
        <ResultTitleSl>Salário Líquido</ResultTitleSl>
        <ResultSl>R$ {salarioLiquido.toFixed(2)}</ResultSl>

        <ResultTitle>Outros Descontos</ResultTitle>
        <Result>R$ {outrosDesc}</Result>

        <ResultTitle>INSS (Tabela INSS 2019)</ResultTitle>
        <Result>{(inss*100)} %</Result>

        <ResultTitle>IRRF (Tabela IRRF 2015)</ResultTitle>
        <Result>{(irrf*100)} %</Result>
      </ResultArea>
      }
    </Page>
  );
}