import {
  IsAlphanumeric,
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Max,
  MaxLength
} from "class-validator";

import { JsonObject, JsonProperty } from "json2typescript";
import { Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@JsonObject("Affiliate")
@Entity()
export class AffiliatePurchase {

  @PrimaryGeneratedColumn()
  public id?: number;

  @JsonProperty("purchaseId", String, false)
  @IsNotEmpty()
  @IsString()
  @Column()
  public purchaseId: string = "";

  @JsonProperty("aid", Number, false)
  @IsNotEmpty()
  @IsInt()
  @Max(999999999999999)
  @Column()
  public aid: number = undefined;

  @JsonProperty("pid", Number, false)
  @IsNotEmpty()
  @IsInt()
  @Max(9999999999)
  @Column()
  public pid: number = undefined;

  @JsonProperty("sid", String, true)
  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(64)
  @Column()
  public sid: string|undefined = undefined;
}
