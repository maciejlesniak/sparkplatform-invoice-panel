import {Injectable} from '@angular/core';
import {VatRate} from "../../dto/vat-rate";
import {MeasurmentUnit} from "../../dto/measurment-unit";

@Injectable()
export class SettingsService {

  private staticStandardVatRates: VatRate[] = [
    {id: 'vat23', name: '23%', rate: 0.23},
    {id: '23%', name: '(depreciated) 23%', rate: 0.23},
    {id: 'vat8', name: '8%', rate: 0.08},
    {id: 'vat5', name: '5%', rate: 0.05},
    {id: 'vat0', name: '0%', rate: 0.0},
    {id: 'vatNone', name: 'none', rate: 0.0}
  ];

  private staticStandardMeasurementUnits: MeasurmentUnit[] = [
    {name: 'pieces', shortName: 'pcs.'},
    {name: '(depreciated) sztuki', shortName: 'szt.'},
    {name: 'hours', shortName: 'h'},
    {name: 'days', shortName: 'd'},
    {name: 'months', shortName: 'mo'},
    {name: 'years', shortName: 'y'},
  ];

  constructor() {
  }

  public getVatRates(): VatRate[] {
    return this.staticStandardVatRates;
  }

  public getMeasurementUnits(): MeasurmentUnit[] {
    return this.staticStandardMeasurementUnits;
  }

  public vatRateIdToRate(vatId: string): number {
    const vatRate = this.getVatRates().find(value => value.id === vatId).rate;

    if (vatRate === undefined) {
      throw new Error(
        SettingsService.errorText('none or unsupported vat rate name found for', vatId));
    }

    return vatRate;
  }

  public vatRateToName(rate: number): string {
    const vatName: string = this.getVatRates().find(value => value.rate === rate).name;

    if (vatName === undefined) {
      throw new Error(
        SettingsService.errorText(
          'none or unsupported vat rate found for',
          rate));
    }

    return vatName;
  }

  public vatRateToRateId(rate: number): string {
    const vatRateId: string = this.getVatRates().find(value => value.rate === rate).id;

    if (vatRateId === undefined) {
      throw new Error(
        SettingsService.errorText(
          'none or unsupported vat rate id found for',
          rate));
    }

    return vatRateId;
  }

  public unitNameToShortName(name: string): string {
    const shortName = this.getMeasurementUnits().find(value => value.name === name).shortName;

    if (shortName === undefined) {
      throw new Error(
        SettingsService.errorText(
          'none or unsupported short name of measurement unit found for',
          name));
    }

    return shortName;
  }

  public unitShortNameToName(shortName: string): string {
    const unitName = this.getMeasurementUnits().find(value => value.shortName === shortName).name;

    if (unitName === undefined) {
      throw new Error(
        SettingsService.errorText(
          'none or unsupported short short name of measurement unit found for',
          shortName));
    }

    return unitName;
  }

  private static errorText(msg: string, param?: any): string {
    return msg + (param !== undefined ? ' [' + param + ']' : '');
  }

}
