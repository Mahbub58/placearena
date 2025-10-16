import { CreatePropertyDto } from './dto/create-property-dto';
import { PropertyService } from './property.service';
import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { Property } from './schemas/property.schema';

@Controller('property')
export class PropertyController {
  constructor(private readonly propertyService: PropertyService) {}

  @Post()
  async crate(@Body() createPropertyDto: CreatePropertyDto) {
    console.log(createPropertyDto);
    return await this.propertyService.create(createPropertyDto);
  }
  @Get('search')
  async searchProperties(@Query('q') query: string) {
    if (!query || query.trim().length === 0) {
      return await this.propertyService.getAll();
    }
    return await this.propertyService.searchProperties(query);
  }
  @Get()
  async getAll() {
    return await this.propertyService.getAll();
  }
  @Get('approve')
  async getAllApproved() {
    return await this.propertyService.getAllApproved();
  }
  @Get('owner/:ownerId')
  async getByOwnerId(@Param('ownerId') ownerId: string) {
    return await this.propertyService.getByOwnerId(ownerId);
  }
  @Post('by-ids')
  async getPropertiesByIds(@Body('ids') ids: string[]) {
    if (!ids || !Array.isArray(ids) || ids.length === 0) {
      throw new BadRequestException('Ids array is required in request body');
    }

    return this.propertyService.getAllProductByIds(ids);
  }
  @Get('not-approved')
  async getUsersNotApproved(): Promise<Property[]> {
    return this.propertyService.getPropertiesNotApproved();
  }
  @Get(':id')
  async getSingle(@Param('id') id: string) {
    return await this.propertyService.getSingle(id);
  }
  @Put(':id')
  async updateProperty(
    @Param('id') id: string,
    @Body() updatedData: Partial<Property>,
  ): Promise<Property> {
    return this.propertyService.updateProperty(id, updatedData);
  }
  @Delete(':id')
  async deleteUser(@Param('id') id: string) {
    return this.propertyService.deleteProperty(id);
  }
}
