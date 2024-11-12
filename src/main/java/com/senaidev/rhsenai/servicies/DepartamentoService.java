package com.senaidev.rhsenai.servicies;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senaidev.rhsenai.entities.Departamento;
import com.senaidev.rhsenai.repositories.DepartamentoRepository;

@Service
public class DepartamentoService {
	
	@Autowired
	private DepartamentoRepository departamentoRepository;
	
	public Departamento saveDepartamento( Departamento departamento) {
		return departamentoRepository.save(departamento);
	}
	
	public List<Departamento> getAllDepartamento(){
		return departamentoRepository.findAll();
	}
	
	public Departamento getDepartamentoById (Long id) {
		return departamentoRepository.findById(id).orElse(null);
	}
	
	public void deleteDepartamento(Long id) {
		departamentoRepository.deleteById(id);
	}

}
