package com.senaidev.rhsenai.servicies;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.senaidev.rhsenai.entities.Funcionario;
import com.senaidev.rhsenai.repositories.FuncionarioRepository;

@Service
public class FuncionarioService {
	
	@Autowired
	private FuncionarioRepository FuncionarioRepository;
	
	public Funcionario saveFuncionario( Funcionario funcionario) {
		return FuncionarioRepository.save(funcionario);
	}
	
	public List<Funcionario> getAllFuncionarios(){
		return FuncionarioRepository.findAll();
	}
	
	public Funcionario getFuncionarioById (Long id) {
		return FuncionarioRepository.findById(id).orElse(null);
	}
	
	public void deleteFuncionario(Long id) {
		FuncionarioRepository.deleteById(id);
	}

}
