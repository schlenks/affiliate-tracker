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

@JsonObject("Affiliate")
export class AffiliateRequest {
  @JsonProperty("purchaseId", String, false)
  @IsNotEmpty()
  @IsString()
  public purchaseId: string;

  @JsonProperty("aid", Number, false)
  @IsNotEmpty()
  @IsInt()
  @Max(999999999999999)
  public aid: number;

  @JsonProperty("pid", Number, false)
  @IsNotEmpty()
  @IsInt()
  @Max(9999999999)
  public pid: number;

  @JsonProperty("sid", String, true)
  @IsOptional()
  @IsAlphanumeric()
  @MaxLength(64)
  public sid: string|undefined;
}
