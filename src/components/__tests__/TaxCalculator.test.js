import React from 'react';
import { render, fireEvent, act } from '@testing-library/react-native';
import TaxCalculator from '../TaxCalculator';

// Helper to format numbers as BRL currency for comparison
const formatAsBRL = (value) => {
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
};

describe('TaxCalculator', () => {
  // Test IR calculation for different Renda Fixa time brackets
  it('calculates IR correctly for Renda Fixa - up to 180 days (22.5%)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    
    fireEvent.press(getAllByText('Renda Fixa')[0]); // Ensure Renda Fixa is selected
    fireEvent.changeText(getByPlaceholderText('10000'), '10000'); // Initial
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Final (Profit = 1000)
    fireEvent.changeText(getByPlaceholderText('365'), '180');   // Days

    fireEvent.press(getByText('Calcular Impostos'));

    // Profit = 1000. IR = 1000 * 0.225 = 225. IOF = 0 (days > 29)
    // Total Taxes = 225. Net Profit = 1000 - 225 = 775. Net Amount = 11000 - 225 = 10775.
    expect(await findByText(formatAsBRL(1000))).toBeTruthy();   // Lucro Bruto
    expect(await findByText('💰 Imposto de Renda (22.5%)')).toBeTruthy();
    expect(await findByText(formatAsBRL(225))).toBeTruthy();    // IR Amount
    expect(await findByText('⏱️ IOF (0.0%)')).toBeTruthy();
    expect(await findByText(formatAsBRL(0))).toBeTruthy();      // IOF Amount
    expect(await findByText(formatAsBRL(225))).toBeTruthy();    // Total de Impostos
    expect(await findByText(formatAsBRL(10775))).toBeTruthy(); // Valor Líquido Final
    expect(await findByText(formatAsBRL(775))).toBeTruthy();   // Lucro Líquido
  });

  it('calculates IR correctly for Renda Fixa - 181 to 360 days (20%)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);

    fireEvent.press(getAllByText('Renda Fixa')[0]);
    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Profit = 1000
    fireEvent.changeText(getByPlaceholderText('365'), '360');

    fireEvent.press(getByText('Calcular Impostos'));
    
    // Profit = 1000. IR = 1000 * 0.20 = 200.
    expect(await findByText('💰 Imposto de Renda (20.0%)')).toBeTruthy();
    expect(await findByText(formatAsBRL(200))).toBeTruthy(); // IR Amount
    expect(await findByText(formatAsBRL(800))).toBeTruthy();   // Lucro Líquido
  });

  it('calculates IR correctly for Renda Fixa - 361 to 720 days (17.5%)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    fireEvent.press(getAllByText('Renda Fixa')[0]);
    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Profit = 1000
    fireEvent.changeText(getByPlaceholderText('365'), '720');

    fireEvent.press(getByText('Calcular Impostos'));

    // Profit = 1000. IR = 1000 * 0.175 = 175.
    expect(await findByText('💰 Imposto de Renda (17.5%)')).toBeTruthy();
    expect(await findByText(formatAsBRL(175))).toBeTruthy(); // IR Amount
    expect(await findByText(formatAsBRL(825))).toBeTruthy();   // Lucro Líquido
  });

  it('calculates IR correctly for Renda Fixa - above 720 days (15%)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    fireEvent.press(getAllByText('Renda Fixa')[0]);
    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Profit = 1000
    fireEvent.changeText(getByPlaceholderText('365'), '721');

    fireEvent.press(getByText('Calcular Impostos'));
    
    // Profit = 1000. IR = 1000 * 0.15 = 150.
    expect(await findByText('💰 Imposto de Renda (15.0%)')).toBeTruthy();
    expect(await findByText(formatAsBRL(150))).toBeTruthy(); // IR Amount
    expect(await findByText(formatAsBRL(850))).toBeTruthy();   // Lucro Líquido
  });

  // Test IOF calculation
  it('calculates IOF correctly for 1 day (96%)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    fireEvent.press(getAllByText('Renda Fixa')[0]);
    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Profit = 1000
    fireEvent.changeText(getByPlaceholderText('365'), '1');     // Days

    fireEvent.press(getByText('Calcular Impostos'));

    // Profit = 1000. IOF = 1000 * 0.96 = 960. IR (22.5%) = 1000 * 0.225 = 225.
    // Total Taxes = 960 + 225 = 1185. Net Profit = 1000 - 1185 = -185.
    expect(await findByText('⏱️ IOF (96.0%)')).toBeTruthy();
    expect(await findByText(formatAsBRL(960))).toBeTruthy();    // IOF Amount
    expect(await findByText(formatAsBRL(225))).toBeTruthy();    // IR Amount
    expect(await findByText(formatAsBRL(1185))).toBeTruthy();   // Total de Impostos
    expect(await findByText(formatAsBRL(-185))).toBeTruthy();   // Lucro Líquido
  });

  it('calculates IOF correctly for 15 days (50%)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    fireEvent.press(getAllByText('Renda Fixa')[0]);
    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Profit = 1000
    fireEvent.changeText(getByPlaceholderText('365'), '15');    // Days

    fireEvent.press(getByText('Calcular Impostos'));
    
    // Profit = 1000. IOF = 1000 * 0.50 = 500. IR (22.5%) = 225.
    // Total Taxes = 500 + 225 = 725. Net Profit = 1000 - 725 = 275.
    expect(await findByText('⏱️ IOF (50.0%)')).toBeTruthy();
    expect(await findByText(formatAsBRL(500))).toBeTruthy();    // IOF Amount
    expect(await findByText(formatAsBRL(725))).toBeTruthy();    // Total de Impostos
    expect(await findByText(formatAsBRL(275))).toBeTruthy();    // Lucro Líquido
  });

  it('calculates IOF as zero for 30 days or more', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    fireEvent.press(getAllByText('Renda Fixa')[0]);
    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Profit = 1000
    fireEvent.changeText(getByPlaceholderText('365'), '30');    // Days

    fireEvent.press(getByText('Calcular Impostos'));
    
    // Profit = 1000. IOF = 0. IR (22.5%) = 225.
    // Total Taxes = 225. Net Profit = 775.
    expect(await findByText('⏱️ IOF (0.0%)')).toBeTruthy();
    // Check for the IOF amount explicitly formatted as R$0,00
    const iofAmountElements = await findAllByText(formatAsBRL(0));
    expect(iofAmountElements.length).toBeGreaterThanOrEqual(1); // IOF Amount should be R$0,00
    
    expect(await findByText(formatAsBRL(225))).toBeTruthy();    // Total de Impostos (which is just IR)
    expect(await findByText(formatAsBRL(775))).toBeTruthy();    // Lucro Líquido
  });

  // Test for Ações (should be exempt from IR and IOF in this simplified calculator)
  it('shows no IR or IOF for Ações type', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    
    // Find the "Ações" button and press it.
    // It's the third button in the typeContainer.
    const acoesButton = getAllByText('Ações')[0]; // Assuming 'Ações' text is unique enough or it's the first
    fireEvent.press(acoesButton);

    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Profit = 1000
    fireEvent.changeText(getByPlaceholderText('365'), '365');   // Days

    fireEvent.press(getByText('Calcular Impostos'));

    // For Ações, simplified calc assumes IR=0, IOF=0
    // Profit = 1000.
    expect(await findByText('💰 Imposto de Renda (0.0%)')).toBeTruthy();
    // Need to find all occurrences of R$0,00 as it could be for IR, IOF, or Total
    const zeroCurrencyElements = await findAllByText(formatAsBRL(0));
    expect(zeroCurrencyElements.length).toBeGreaterThanOrEqual(2); // IR Amount and IOF Amount should be R$0,00

    expect(await findByText(formatAsBRL(1000))).toBeTruthy();   // Lucro Líquido (should be same as Lucro Bruto)
  });

  // Test for Fundos (same logic as Renda Fixa for this calculator)
  it('calculates correctly for Fundos type (same as Renda Fixa)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    
    const fundosButton = getAllByText('Fundos')[0];
    fireEvent.press(fundosButton);

    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '11000'); // Profit = 1000
    fireEvent.changeText(getByPlaceholderText('365'), '180');   // Days

    fireEvent.press(getByText('Calcular Impostos'));
    
    // Profit = 1000. IR = 1000 * 0.225 = 225.
    expect(await findByText('💰 Imposto de Renda (22.5%)')).toBeTruthy();
    expect(await findByText(formatAsBRL(225))).toBeTruthy(); // IR Amount
    expect(await findByText(formatAsBRL(775))).toBeTruthy();   // Lucro Líquido
  });

  // Test for no profit scenario
  it('handles no profit scenario (zero tax)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    fireEvent.press(getAllByText('Renda Fixa')[0]);
    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '10000'); // Final = Initial (Profit = 0)
    fireEvent.changeText(getByPlaceholderText('365'), '365');

    fireEvent.press(getByText('Calcular Impostos'));

    // Profit = 0. All taxes = 0.
    expect(await findByText(formatAsBRL(0))).toBeTruthy();   // Lucro Bruto should be 0
    // IR Rate and IOF Rate will still show based on days, but amounts will be 0.
    expect(await findByText('💰 Imposto de Renda (17.5%)')).toBeTruthy(); // For 365 days
    expect(await findByText('⏱️ IOF (0.0%)')).toBeTruthy();
    
    // Check that all monetary tax values are R$0,00
    // IR Amount, IOF Amount, Total de Impostos, Lucro Líquido (which is 0)
    // Lucro Bruto is also R$0,00. Valor Líquido Final will be R$10.000,00
    const zeroCurrencyElements = await findAllByText(formatAsBRL(0));
    // Expect at least 4: Profit, IR amount, IOF amount, Total Taxes, Net Profit
    expect(zeroCurrencyElements.length).toBeGreaterThanOrEqual(5); 

    expect(await findByText(formatAsBRL(10000))).toBeTruthy(); // Valor Líquido Final
  });

  it('handles negative profit scenario (loss, zero tax)', async () => {
    const { getByPlaceholderText, getByText, findByText, getAllByText } = render(<TaxCalculator />);
    fireEvent.press(getAllByText('Renda Fixa')[0]);
    fireEvent.changeText(getByPlaceholderText('10000'), '10000');
    fireEvent.changeText(getByPlaceholderText('12000'), '9000'); // Final < Initial (Profit = -1000)
    fireEvent.changeText(getByPlaceholderText('365'), '365');

    fireEvent.press(getByText('Calcular Impostos'));

    // Profit = -1000. All taxes = 0. Net Profit = -1000. Net Amount = 9000.
    expect(await findByText(formatAsBRL(-1000))).toBeTruthy(); // Lucro Bruto (which is the loss)
    expect(await findByText('💰 Imposto de Renda (0.0%)')).toBeTruthy(); // When profit <=0, rate display is 0
    expect(await findByText('⏱️ IOF (0.0%)')).toBeTruthy();     // When profit <=0, rate display is 0
    
    const zeroCurrencyAmounts = await findAllByText(formatAsBRL(0));
    expect(zeroCurrencyAmounts.length).toBeGreaterThanOrEqual(3); // IR Amount, IOF Amount, Total Taxes

    expect(await findByText(formatAsBRL(9000))).toBeTruthy();  // Valor Líquido Final
    expect(await findByText(formatAsBRL(-1000))).toBeTruthy(); // Lucro Líquido (the loss)
  });
});
