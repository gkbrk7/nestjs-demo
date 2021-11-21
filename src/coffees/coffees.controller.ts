import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Inject,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
  Res,
  SetMetadata,
  UseFilters,
  UsePipes,
  ValidationPipe,
} from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { ApiForbiddenResponse, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Protocol } from '../common/decorators/protocol.decorator';
import { Public } from '../common/decorators/public.decorator';
import { PaginationQueryDto } from '../common/dto/pagination-query.dto';
import { CoffeesService } from './coffees.service';
import { CreateCoffeeDto } from './dto/create-coffee.dto';
import { UpdateCoffeeDto } from './dto/update-coffee.dto';

// @UsePipes(ValidationPipe)
// @UsePipes(new ValidationPipe())
@ApiTags('coffees')
@Controller('coffees')
export class CoffeesController {
  constructor(
    private readonly coffeesService: CoffeesService, // @Inject(REQUEST) private readonly request: Request
  ) {}

  // @Get()
  // findAll(@Res() response) {
  //     response.status(200).send('This action gets all the test data');
  // }

  // @UsePipes(ValidationPipe)
  // @SetMetadata('isPublic', true) // Set metadata for isPublic property and check it
  // @ApiResponse({ status: 403, description: 'Forbidden.' })
  @ApiForbiddenResponse({ description: 'Forbidden.' })
  @Public() // Custom decorator
  @Get()
  async findAll(
    @Protocol('https') protocol: string,
    @Query() paginationQuery: PaginationQueryDto,
  ) {
    console.log(protocol);
    // const { limit, offset } = paginationQuery;
    // await new Promise((resolve) => setTimeout(resolve, 5000)); // Trigger timeout interceptor
    return await this.coffeesService.findAll(paginationQuery);
    // return `This action gets all the test data. Limit: ${limit}, offset: ${offset}`;
  }

  // @Get()
  // findAll() {
  //     return 'This action gets all the test data';
  // }
  @Get(':id')
  async findOne(@Param('id', ParseIntPipe) id: number) {
    // return `This action returns #${id} test data`;
    // console.log(typeof id); // number
    console.log(id); // Log for custom parse-int pipe in common folders
    return await this.coffeesService.findOne(id);
  }

  // @Post()
  // create(@Body('name') body) {
  //     return body;
  // }

  // @Post()
  // create(@Body() body) {
  //     return body;
  // }

  @Post()
  // @HttpCode(HttpStatus.GONE)
  async create(@Body() createCoffeeDto: CreateCoffeeDto) {
    // console.log(createCoffeeDto instanceof CreateCoffeeDto); // Actually this dto is not an instance of CreateCoffeeDto. So it returns false. Add transform property in main.ts -> ValidationPipe
    return await this.coffeesService.create(createCoffeeDto);
    // return body;
  }

  // @Get(':id')
  // findOne(@Param() params) {
  //     return `This action returns #${params.id} test data`;
  // }

  // @Patch(':id')
  // async update(@Param('id') id: string, @Body(ValidationPipe) updateCoffeeDto: UpdateCoffeeDto) {
  //     // return `This action updates #${id} coffee`;
  //     return await this.coffeesService.update(id, updateCoffeeDto);
  // }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateCoffeeDto: UpdateCoffeeDto,
  ) {
    // return `This action updates #${id} coffee`;
    return await this.coffeesService.update(id, updateCoffeeDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: number) {
    // return `This action removes #${id} coffee`;
    return await this.coffeesService.remove(id);
  }
}
